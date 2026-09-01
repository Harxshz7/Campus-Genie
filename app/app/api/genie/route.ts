import { NextResponse } from 'next/server';
import {
  GOLDEN_PATH_RESPONSE,
  PRIYA_PM_RESPONSE,
  DATA_SCIENTIST_RESPONSE,
  WHATIF_5HRS_RESPONSE,
} from '@/lib/fixtures';
import { OpportunityStep, StudentProfileBadge } from '@/lib/types';

const MAX_POLL_RETRIES = 35;
const POLL_INTERVAL_MS = 1500;

/**
 * Extract final text answer, thoughts, and generated SQL from Databricks Genie payload.
 */
function extractGenieText(data: any): string {
  if (!data) return '';

  const textParts: string[] = [];

  // 1. Direct top-level text fields
  if (typeof data.content === 'string' && data.content.trim().length > 0) {
    textParts.push(data.content.trim());
  }
  if (typeof data.text === 'string' && data.text.trim().length > 0) {
    textParts.push(data.text.trim());
  }

  // 2. Nested message object
  if (data.message && typeof data.message === 'object') {
    const nestedText = extractGenieText(data.message);
    if (nestedText) textParts.push(nestedText);
  }

  // 3. Attachments array processing
  const attachments = data.attachments || (data.message && data.message.attachments);
  if (Array.isArray(attachments) && attachments.length > 0) {
    for (const att of attachments) {
      if (!att) continue;

      if (typeof att.text === 'string' && att.text.trim().length > 0) {
        textParts.push(att.text.trim());
      } else if (att.text && typeof att.text.content === 'string' && att.text.content.trim().length > 0) {
        textParts.push(att.text.content.trim());
      } else if (typeof att.content === 'string' && att.content.trim().length > 0) {
        textParts.push(att.content.trim());
      }

      if (att.query) {
        if (typeof att.query.description === 'string' && att.query.description.trim().length > 0) {
          textParts.push(att.query.description.trim());
        }

        if (Array.isArray(att.query.thoughts) && att.query.thoughts.length > 0) {
          const thoughtsText = att.query.thoughts
            .map((t: any) => (typeof t === 'string' ? t : t.content))
            .filter(Boolean)
            .join('\n');
          if (thoughtsText) {
            textParts.push(`Genie Reasoning Trace:\n${thoughtsText}`);
          }
        }

        if (typeof att.query.query === 'string' && att.query.query.trim().length > 0) {
          textParts.push(`Generated SQL Query:\n\`\`\`sql\n${att.query.query.trim()}\n\`\`\``);
        }
      }
    }
  }

  if (textParts.length > 0) {
    const uniqueParts = Array.from(new Set(textParts));
    return uniqueParts.join('\n\n');
  }

  if (data.query_result && typeof data.query_result.description === 'string' && data.query_result.description.trim().length > 0) {
    return data.query_result.description.trim();
  }

  return '';
}

/**
 * Intelligently parse user name and career goal from ANY prompt.
 */
function parseProfileAndGoal(message: string): StudentProfileBadge {
  const lower = message.toLowerCase();

  let studentName = 'Arjun Mehta';
  let initials = 'AM';

  const nameMatch = message.match(/(?:i\s*am|iam|my name is|im)\s+([A-Za-z\s]{2,30})/i);
  if (nameMatch && nameMatch[1]) {
    const rawName = nameMatch[1]
      .split(/\b(how|what|where|who|can|i|want|to|become|a|an|the|is|my|target)\b/i)[0]
      .trim();

    if (rawName.length >= 2) {
      studentName = rawName
        .split(' ')
        .filter((w) => w.length > 0)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');

      const parts = studentName.split(' ');
      initials =
        parts.length > 1
          ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
          : parts[0].slice(0, 2).toUpperCase();
    }
  } else if (lower.includes('priya')) {
    studentName = 'Priya Sharma';
    initials = 'PS';
  } else if (lower.includes('vikram')) {
    studentName = 'Vikram Singh';
    initials = 'VS';
  } else if (lower.includes('sneha')) {
    studentName = 'Sneha Reddy';
    initials = 'SR';
  }

  if (lower.includes('ai engineer') || lower.includes('ai/ml') || lower.includes('machine learning')) {
    return {
      studentName,
      initials,
      role: 'AI Engineer',
      company: 'TechCorp India',
      packageLpa: 18.0,
      department: 'CSE',
      year: 2,
      availableHours: 15,
    };
  }

  if (lower.includes('priya') || lower.includes('product manager') || lower.includes('pm')) {
    return {
      studentName: 'Priya Sharma',
      initials: 'PS',
      role: 'Associate Product Manager',
      company: 'ProductHive',
      packageLpa: 14.0,
      department: 'CSE',
      year: 2,
      availableHours: 12,
    };
  }

  if (lower.includes('data scientist') || lower.includes('data science') || lower.includes('analyst')) {
    return {
      studentName,
      initials,
      role: 'Data Scientist',
      company: 'DataMinds Analytics',
      packageLpa: 15.0,
      department: 'CSE',
      year: 2,
      availableHours: 14,
    };
  }

  if (lower.includes('full stack') || lower.includes('fullstack') || lower.includes('java full stack') || lower.includes('java')) {
    return {
      studentName,
      initials,
      role: 'Java Full Stack Developer',
      company: 'EnterpriseTech India',
      packageLpa: 16.0,
      department: 'CSE',
      year: 2,
      availableHours: 15,
    };
  }

  return {
    studentName,
    initials,
    role: 'AI Engineer',
    company: 'TechCorp India',
    packageLpa: 18.0,
    department: 'CSE',
    year: 2,
    availableHours: 15,
  };
}

/**
 * Generate highly detailed opportunity path steps with every related detail.
 */
function buildCustomRoleResponse(message: string, profile: StudentProfileBadge) {
  const lower = message.toLowerCase();

  // 1. Java Full Stack Developer Detailed Path
  if (profile.role === 'Java Full Stack Developer') {
    return {
      query: message,
      explanation: `${profile.studentName}, based on your profile as a 2nd-year CSE student with Java and SQL background, your goal to become a Java Full Stack Developer requires 5 key skill gaps: Core Java 21 & Spring Boot 3 (L3), Frontend React 19 & Tailwind (L3), PostgreSQL Database Design (L3), RESTful Microservices (L2), and Docker/DevOps CI/CD (L2). Given your 15 hrs/week budget, here is your 4-phase sequential opportunity roadmap:`,
      placementTarget: {
        role: profile.role,
        company: profile.company,
        packageLpa: profile.packageLpa,
      },
      studentProfile: profile,
      steps: [
        {
          stepNumber: 1,
          title: 'Java & Spring Boot REST API Project',
          type: 'Project' as const,
          whyFits: 'Uses your existing Java & SQL strengths to teach Spring Boot 3, REST API architecture, and ORM.',
          prerequisites: 'Java (Level 2), SQL (Level 2)',
          weeklyHours: 6,
          unlocks: 'Java 21 (Level 3), Spring Boot 3 (Level 3), REST APIs (Level 3)',
          mentorOrSupervisor: 'Prof. Ramesh K. (CSE Dept)',
          locationOrDept: 'Software Eng. Lab 302',
          durationOrDates: '6 Weeks (Sep - Oct)',
          stipendOrPackage: 'Project Certificate & Open Source Credit',
          techStack: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'REST API', 'Maven'],
          noteColor: 'yellow' as const,
        },
        {
          stepNumber: 2,
          title: 'Web Developers Club (Meets Tuesdays)',
          type: 'Club' as const,
          whyFits: 'Introduces modern React.js 19, Tailwind CSS, State Management, and peer frontend code reviews.',
          prerequisites: 'HTML/CSS (Level 1)',
          weeklyHours: 4,
          unlocks: 'React.js (Level 3), JavaScript ES6+ (Level 3), UI/UX Design (Level 2)',
          mentorOrSupervisor: 'Student Leads (WebDev Club)',
          locationOrDept: 'Student Activity Center - Room 104',
          durationOrDates: 'Weekly Tuesdays @ 5:00 PM',
          stipendOrPackage: 'Club Membership & Hackathon Access',
          techStack: ['React 19', 'Tailwind CSS', 'JavaScript', 'HTML5', 'Vite'],
          noteColor: 'cyan' as const,
        },
        {
          stepNumber: 3,
          title: 'Full-Stack Microservices Bootcamp (Oct 20)',
          type: 'Event' as const,
          whyFits: '3-day hands-on intensive workshop connecting React frontends with Spring Cloud microservices & API Gateway.',
          prerequisites: 'Java (Level 2), React (Level 2)',
          weeklyHours: 4,
          unlocks: 'Microservices (Level 2), Docker Containers (Level 2), Spring Cloud (Level 2)',
          mentorOrSupervisor: 'Anand Kumar (Lead Architect @ TechCorp)',
          locationOrDept: 'Main Campus Auditorium',
          durationOrDates: 'Oct 20 - Oct 22 (Weekend)',
          stipendOrPackage: 'Databricks Hands-On Certificate',
          techStack: ['Spring Cloud', 'Docker', 'Microservices', 'REST', 'Git'],
          noteColor: 'pink' as const,
        },
        {
          stepNumber: 4,
          title: 'Enterprise Web Systems Research',
          type: 'Research' as const,
          whyFits: 'Under Dr. Ananya Roy (CSE Dept). Develop scalable full-stack web platforms with automated CI/CD pipelines.',
          prerequisites: 'Java (Level 3), React (Level 2)',
          weeklyHours: 7,
          unlocks: 'System Architecture (Level 3), CI/CD Pipelines (Level 2), Docker/K8s (Level 2)',
          mentorOrSupervisor: 'Dr. Ananya Roy (Associate Professor, CSE)',
          locationOrDept: 'Cloud Systems Research Lab',
          durationOrDates: '12 Weeks (Semester Research)',
          stipendOrPackage: '₹15,000 / month Research Stipend',
          techStack: ['Distributed Systems', 'CI/CD Pipelines', 'Docker', 'Spring Boot', 'React'],
          noteColor: 'mint' as const,
        },
        {
          stepNumber: 5,
          title: 'HackStack Full-Stack Challenge (Nov 18)',
          type: 'Hackathon' as const,
          whyFits: '36-hour competitive hackathon to build and deploy an end-to-end full-stack web application under pressure.',
          prerequisites: 'Java (Level 2), React (Level 2)',
          weeklyHours: 4,
          unlocks: 'End-to-End Delivery (Level 3), Teamwork (Level 3), Live Pitching (Level 2)',
          mentorOrSupervisor: 'HackStack Judging Panel',
          locationOrDept: 'Campus Innovation Hub',
          durationOrDates: 'Nov 18 - Nov 20 (36 Hours)',
          stipendOrPackage: '₹1,000,000 Total Cash Prize Pool',
          techStack: ['Full-Stack Web', 'Vercel', 'PostgreSQL', 'Spring Boot', 'Tailwind'],
          noteColor: 'yellow' as const,
        },
        {
          stepNumber: 6,
          title: 'EnterpriseTech Java Full Stack Placement',
          type: 'Placement' as const,
          whyFits: 'Target placement role at ₹16.0 LPA. All 5 full-stack skill requirements 100% satisfied!',
          prerequisites: 'Java (L3), Spring Boot (L3), React (L3), SQL (L3), Microservices (L2)',
          weeklyHours: 0,
          unlocks: 'Full-time Java Full Stack Engineer Job Offer (₹16.0 LPA)',
          mentorOrSupervisor: 'EnterpriseTech HR & Placement Cell',
          locationOrDept: 'Placement Cell Auditorium',
          durationOrDates: 'Placement Season 2026',
          stipendOrPackage: '₹16.0 LPA Full-time Offer',
          techStack: ['Java 21', 'Spring Boot 3', 'React 19', 'PostgreSQL', 'Docker'],
          noteColor: 'mint' as const,
        },
      ],
    };
  }

  // 2. Priya PM Detailed Response
  if (lower.includes('priya') || profile.role === 'Associate Product Manager') {
    return {
      ...PRIYA_PM_RESPONSE,
      query: message,
      studentProfile: profile,
      steps: PRIYA_PM_RESPONSE.steps.map((step) => ({
        ...step,
        mentorOrSupervisor: step.stepNumber === 5 ? 'Dr. Rekha Menon (MBA Dept)' : 'Campus Product Mentors',
        locationOrDept: 'Design Thinking & Innovation Lab',
        durationOrDates: 'Fall Semester 2026',
        stipendOrPackage: step.stepNumber === 6 ? '₹14.0 LPA Full-time APM Offer' : 'Workshop Certificate',
        techStack: ['UI/UX Wireframing', 'Product Analytics', 'User Research', 'Agile/Scrum', 'Figma'],
      })),
    };
  }

  // 3. Data Scientist Detailed Response
  if (profile.role === 'Data Scientist') {
    return {
      ...DATA_SCIENTIST_RESPONSE,
      query: message,
      studentProfile: profile,
      steps: DATA_SCIENTIST_RESPONSE.steps.map((step) => ({
        ...step,
        mentorOrSupervisor: step.stepNumber === 3 ? 'Dr. Priya Nair (MATH Dept)' : 'Data Science Mentors',
        locationOrDept: 'Data Analytics Center',
        durationOrDates: 'Fall Semester 2026',
        stipendOrPackage: step.stepNumber === 5 ? '₹15.0 LPA Full-time Data Scientist Offer' : 'Research Credit',
        techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'SQL', 'Databricks'],
      })),
    };
  }

  // 4. Default AI Engineer Detailed Path
  return {
    ...GOLDEN_PATH_RESPONSE,
    query: message,
    studentProfile: profile,
    steps: GOLDEN_PATH_RESPONSE.steps.map((step) => ({
      ...step,
      mentorOrSupervisor: step.stepNumber === 4 ? 'Dr. Rajesh Kumar (CSE Dept)' : 'AI/ML Faculty Team',
      locationOrDept: 'AI Research & High-Performance Computing Lab',
      durationOrDates: 'Fall Semester 2026',
      stipendOrPackage: step.stepNumber === 6 ? '₹18.0 LPA Full-time AI Engineer Offer' : '₹18,000 / mo Stipend',
      techStack: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Model Deployment', 'Docker'],
    })),
  };
}

export async function POST(req: Request) {
  try {
    let body: any = {};
    try {
      const rawText = await req.text();
      const sanitized = rawText.replace(/[\r\n]+/g, ' ');
      body = JSON.parse(sanitized);
    } catch (e) {
      body = {};
    }

    const message: string = body.message || '';
    const conversationId: string | undefined = body.conversationId;

    const host = process.env.DATABRICKS_HOST?.replace(/\/$/, '');
    const token = process.env.DATABRICKS_TOKEN?.trim();
    const spaceId = process.env.GENIE_SPACE_ID?.trim();

    const profileBadge = parseProfileAndGoal(message);
    const customData = buildCustomRoleResponse(message, profileBadge);

    // Check if Databricks Genie credentials exist
    if (host && token && spaceId && message.trim().length > 0) {
      console.log(`[Genie API] Databricks credentials found. Space: ${spaceId}. Host: ${host}`);
      console.log(`[Genie API] User query: "${message}"`);

      try {
        let activeConvId: string | null =
          conversationId && !conversationId.startsWith('genie-') ? conversationId : null;
        let messageId: string | null = null;
        let initialStatus: string | null = null;
        let rawContent: string | null = null;

        if (activeConvId) {
          try {
            const msgEndpoint = `${host}/api/2.0/genie/spaces/${spaceId}/conversations/${activeConvId}/messages`;
            const msgRes = await fetch(msgEndpoint, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ content: message }),
            });

            if (msgRes.ok) {
              const data = await msgRes.json();
              messageId = data.message_id || data.id || (data.message && (data.message.message_id || data.message.id));
              initialStatus = data.status || (data.message && data.message.status);
              rawContent = extractGenieText(data);
            } else {
              activeConvId = null;
            }
          } catch (err) {
            activeConvId = null;
          }
        }

        if (!messageId || !activeConvId) {
          const startEndpoint = `${host}/api/2.0/genie/spaces/${spaceId}/start-conversation`;
          const startRes = await fetch(startEndpoint, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
          });

          if (startRes.ok) {
            const data = await startRes.json();
            activeConvId =
              data.conversation_id ||
              data.id ||
              (data.conversation && (data.conversation.conversation_id || data.conversation.id));
            messageId =
              data.message_id ||
              data.id ||
              (data.message && (data.message.message_id || data.message.id));
            initialStatus = data.status || (data.message && data.message.status);
            rawContent = extractGenieText(data);
          } else {
            const errText = await startRes.text();
            console.warn(`[Genie API] start-conversation returned status ${startRes.status}: ${errText}`);
          }
        }

        if (activeConvId && messageId) {
          let currentStatus = (initialStatus || '').toUpperCase();
          let retries = 0;
          const terminalStatuses = ['COMPLETED', 'FAILED', 'CANCELLED'];

          while (retries < MAX_POLL_RETRIES && !terminalStatuses.includes(currentStatus)) {
            await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
            retries++;

            try {
              const pollEndpoint = `${host}/api/2.0/genie/spaces/${spaceId}/conversations/${activeConvId}/messages/${messageId}`;
              const pollRes = await fetch(pollEndpoint, {
                headers: { Authorization: `Bearer ${token}` },
              });

              if (pollRes.ok) {
                const pollData = await pollRes.json();
                const statusVal = pollData.status || (pollData.message && pollData.message.status);
                if (statusVal) {
                  currentStatus = String(statusVal).toUpperCase();
                }

                const extracted = extractGenieText(pollData);
                if (extracted) {
                  rawContent = extracted;
                }
              }
            } catch (pollErr) {
              console.warn(`[Genie API] Error during poll #${retries}:`, pollErr);
            }
          }
        }

        if (rawContent && rawContent.trim().length > 0) {
          console.log(`[Genie API] Real Databricks Genie response obtained (${rawContent.length} chars). Returning source="genie".`);

          let finalExplanation = rawContent;
          if (rawContent.toLowerCase().includes('unrelated to the database schema') || rawContent.toLowerCase().includes('cannot find')) {
            finalExplanation = `${profileBadge.studentName}, based on your goal to become a ${profileBadge.role}, here is your customized opportunity path across campus skills:\n\nDatabricks Genie Note:\n${rawContent}`;
          }

          return NextResponse.json({
            query: message,
            explanation: finalExplanation,
            conversationId: activeConvId || 'genie-conv-1',
            source: 'genie',
            studentProfile: profileBadge,
            steps: customData.steps,
            placementTarget: customData.placementTarget,
          });
        }
      } catch (err) {
        console.warn('[Genie API] Real Genie call error, using dynamic fallback:', err);
      }
    }

    const dynamicResponse = buildCustomRoleResponse(message, profileBadge);
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      ...dynamicResponse,
      conversationId: conversationId || 'genie-session-fixture',
      source: 'fixture',
    });
  } catch (error) {
    console.error('[Genie API] Unhandled route error:', error);
    const defaultProfile = parseProfileAndGoal('');
    const defaultData = buildCustomRoleResponse('', defaultProfile);

    return NextResponse.json(
      {
        query: '',
        explanation: 'An unexpected error occurred while processing your request.',
        steps: defaultData.steps,
        placementTarget: defaultData.placementTarget,
        studentProfile: defaultProfile,
        conversationId: 'genie-session-fixture',
        source: 'fixture',
        error: String(error),
      },
      { status: 200 }
    );
  }
}
