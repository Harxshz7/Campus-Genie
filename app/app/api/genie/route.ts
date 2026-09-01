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
 * Parse Databricks Genie response to extract clean natural language explanation and separate SQL query.
 */
function parseGenieResponsePayload(data: any): { explanation: string; sqlQuery?: string } {
  if (!data) return { explanation: '' };

  let rawText = '';
  let extractedSql = '';

  // Extract from attachments if present
  const attachments = data.attachments || (data.message && data.message.attachments);
  if (Array.isArray(attachments) && attachments.length > 0) {
    for (const att of attachments) {
      if (!att) continue;

      if (typeof att.text === 'string' && att.text.trim()) {
        rawText += att.text.trim() + '\n\n';
      } else if (att.text && typeof att.text.content === 'string' && att.text.content.trim()) {
        rawText += att.text.content.trim() + '\n\n';
      } else if (typeof att.content === 'string' && att.content.trim()) {
        rawText += att.content.trim() + '\n\n';
      }

      if (att.query) {
        if (typeof att.query.description === 'string' && att.query.description.trim()) {
          rawText += att.query.description.trim() + '\n\n';
        }
        if (typeof att.query.query === 'string' && att.query.query.trim()) {
          extractedSql = att.query.query.trim();
        }
      }
    }
  }

  if (!rawText.trim() && typeof data.content === 'string') {
    rawText = data.content;
  }
  if (!rawText.trim() && typeof data.text === 'string') {
    rawText = data.text;
  }

  if (!rawText.trim()) {
    return { explanation: '', sqlQuery: extractedSql || undefined };
  }

  // Extract ```sql ... ``` block if embedded in text
  const sqlMatch = rawText.match(/```sql\s*([\s\S]*?)\s*```/i);
  if (sqlMatch && sqlMatch[1]) {
    if (!extractedSql) {
      extractedSql = sqlMatch[1].trim();
    }
    rawText = rawText.replace(/```sql\s*[\s\S]*?\s*```/gi, '');
  }

  // Clean out verbose internal debug lines and keep ONLY the final natural language answer
  let cleanExplanation = rawText
    .replace(/Genie Reasoning Trace:[\s\S]*?(?=(There are|Based on|For|You can|Here is|The required|$))/i, '')
    .replace(/You want to see a list of[\s\S]*?(?=(There are|Based on|For|You can|Here is|The required|$))/i, '')
    .trim();

  // If cleaning removed everything, use trimmed rawText
  if (!cleanExplanation) {
    cleanExplanation = rawText.trim();
  }

  return {
    explanation: cleanExplanation,
    sqlQuery: extractedSql || undefined,
  };
}

/**
 * Intelligently parse student name and target role from prompt.
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
 * Build opportunity steps tailored specifically to query intent (Hackathons, Research, Career Path).
 */
function buildOpportunityStepsForQuery(message: string, profile: StudentProfileBadge): { steps: OpportunityStep[]; placementTarget: any } {
  const lower = message.toLowerCase();

  // Hackathons specific query
  if (lower.includes('hackathon') || lower.includes('hackathons')) {
    return {
      placementTarget: {
        role: 'AI/ML Hackathon Challenger',
        company: 'DataHack & HealthTech Hub',
        packageLpa: 18.0,
      },
      steps: [
        {
          stepNumber: 1,
          title: 'DataHack 2026 Hackathon (Nov 15)',
          type: 'Hackathon' as const,
          whyFits: '48-hour competitive hackathon focused on end-to-end Machine Learning, model deployment, and FastAPI.',
          prerequisites: 'Python (Level 2), Machine Learning (Level 2)',
          weeklyHours: 3,
          unlocks: 'End-to-End ML (Level 3), Teamwork (Level 3), Live Pitching (Level 3)',
          mentorOrSupervisor: 'DataHack Organizing Committee',
          locationOrDept: 'Tech Auditorium - Main Campus',
          durationOrDates: 'Nov 15, 2026 (48 Hours)',
          stipendOrPackage: '₹1,500,000 Total Cash Prize Pool',
          techStack: ['Python', 'Machine Learning', 'FastAPI', 'Docker', 'Scikit-Learn'],
          noteColor: 'yellow' as const,
        },
        {
          stepNumber: 2,
          title: 'HealthTech Hackathon (Dec 08)',
          type: 'Hackathon' as const,
          whyFits: 'Medical AI hackathon building computer vision & diagnostic models on anonymized health datasets.',
          prerequisites: 'Python (Level 2), Machine Learning (Level 2)',
          weeklyHours: 4,
          unlocks: 'Healthcare AI (Level 3), Computer Vision (Level 2)',
          mentorOrSupervisor: 'HealthTech Research Lab',
          locationOrDept: 'Innovation Center',
          durationOrDates: 'Dec 08, 2026 (36 Hours)',
          stipendOrPackage: '₹800,000 Cash Prize + Incubation',
          techStack: ['Python', 'Machine Learning', 'PyTorch', 'OpenCV'],
          noteColor: 'cyan' as const,
        },
        {
          stepNumber: 3,
          title: 'Startup Weekend Hackathon (Nov 08)',
          type: 'Hackathon' as const,
          whyFits: '54-hour startup hackathon taking product ideas from zero to interactive prototype and investor pitch.',
          prerequisites: 'HTML/CSS (Level 2), JS (Level 2)',
          weeklyHours: 4,
          unlocks: 'Product Management (Level 3), Pitching (Level 3)',
          mentorOrSupervisor: 'E-Cell Judging Panel',
          locationOrDept: 'E-Cell Hub',
          durationOrDates: 'Nov 08, 2026 (54 Hours)',
          stipendOrPackage: '₹500,000 Seed Grant',
          techStack: ['JavaScript', 'React', 'Tailwind', 'Figma'],
          noteColor: 'pink' as const,
        },
        {
          stepNumber: 4,
          title: 'Data Engineering Challenge (Nov 30)',
          type: 'Hackathon' as const,
          whyFits: '36-hour data engineering challenge building production ETL pipelines and Databricks analytics dashboards.',
          prerequisites: 'Python (Level 2), SQL (Level 2)',
          weeklyHours: 4,
          unlocks: 'Data Engineering (Level 3), ETL Pipelines (Level 2)',
          mentorOrSupervisor: 'DataPipe Systems Team',
          locationOrDept: 'Cloud Systems Lab',
          durationOrDates: 'Nov 30, 2026 (36 Hours)',
          stipendOrPackage: '₹600,000 Prize Pool',
          techStack: ['Python', 'SQL', 'Databricks', 'Spark'],
          noteColor: 'mint' as const,
        },
      ],
    };
  }

  // Java Full Stack Developer
  if (profile.role === 'Java Full Stack Developer') {
    return {
      placementTarget: {
        role: profile.role,
        company: profile.company,
        packageLpa: profile.packageLpa,
      },
      steps: [
        {
          stepNumber: 1,
          title: 'Java & Spring Boot REST API Project',
          type: 'Project' as const,
          whyFits: 'Uses your Java & SQL strengths to teach Spring Boot 3, REST API architecture, and ORM.',
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
          whyFits: 'Introduces modern React.js 19, Tailwind CSS, State Management, and peer code reviews.',
          prerequisites: 'HTML/CSS (Level 1)',
          weeklyHours: 4,
          unlocks: 'React.js (Level 3), JavaScript ES6+ (Level 3), UI/UX Design (Level 2)',
          mentorOrSupervisor: 'Student Leads (WebDev Club)',
          locationOrDept: 'Student Activity Center',
          durationOrDates: 'Weekly Tuesdays @ 5:00 PM',
          stipendOrPackage: 'Club Membership & Hackathon Access',
          techStack: ['React 19', 'Tailwind CSS', 'JavaScript', 'HTML5', 'Vite'],
          noteColor: 'cyan' as const,
        },
        {
          stepNumber: 3,
          title: 'Full-Stack Microservices Bootcamp (Oct 20)',
          type: 'Event' as const,
          whyFits: '3-day hands-on intensive workshop connecting React frontends with Spring Cloud microservices.',
          prerequisites: 'Java (Level 2), React (Level 2)',
          weeklyHours: 4,
          unlocks: 'Microservices (Level 2), Docker Containers (Level 2)',
          mentorOrSupervisor: 'Anand Kumar (Lead Architect)',
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
          whyFits: 'Under Dr. Ananya Roy (CSE Dept). Develop scalable full-stack web platforms with automated CI/CD.',
          prerequisites: 'Java (Level 3), React (Level 2)',
          weeklyHours: 7,
          unlocks: 'System Architecture (Level 3), CI/CD Pipelines (Level 2)',
          mentorOrSupervisor: 'Dr. Ananya Roy (Associate Professor)',
          locationOrDept: 'Cloud Systems Research Lab',
          durationOrDates: '12 Weeks (Semester Research)',
          stipendOrPackage: '₹15,000 / month Research Stipend',
          techStack: ['Distributed Systems', 'CI/CD Pipelines', 'Docker', 'Spring Boot'],
          noteColor: 'mint' as const,
        },
        {
          stepNumber: 5,
          title: 'HackStack Full-Stack Challenge (Nov 18)',
          type: 'Hackathon' as const,
          whyFits: '36-hour competitive hackathon to build and deploy an end-to-end full-stack web application.',
          prerequisites: 'Java (Level 2), React (Level 2)',
          weeklyHours: 4,
          unlocks: 'End-to-End Delivery (Level 3), Teamwork (Level 3)',
          mentorOrSupervisor: 'HackStack Judging Panel',
          locationOrDept: 'Campus Innovation Hub',
          durationOrDates: 'Nov 18 - Nov 20 (36 Hours)',
          stipendOrPackage: '₹1,000,000 Cash Prize Pool',
          techStack: ['Full-Stack Web', 'Vercel', 'PostgreSQL', 'Spring Boot'],
          noteColor: 'yellow' as const,
        },
        {
          stepNumber: 6,
          title: 'EnterpriseTech Java Full Stack Placement',
          type: 'Placement' as const,
          whyFits: 'Target placement role at ₹16.0 LPA. All 5 full-stack skill requirements satisfied!',
          prerequisites: 'Java (L3), Spring Boot (L3), React (L3), SQL (L3), Microservices (L2)',
          weeklyHours: 0,
          unlocks: 'Full-time Java Full Stack Job Offer (₹16.0 LPA)',
          mentorOrSupervisor: 'EnterpriseTech Placement Cell',
          locationOrDept: 'Placement Auditorium',
          durationOrDates: 'Placement Season 2026',
          stipendOrPackage: '₹16.0 LPA Full-time Offer',
          techStack: ['Java 21', 'Spring Boot 3', 'React 19', 'PostgreSQL', 'Docker'],
          noteColor: 'mint' as const,
        },
      ],
    };
  }

  // Default AI Engineer Path
  return {
    placementTarget: {
      role: 'AI Engineer',
      company: 'TechCorp India',
      packageLpa: 18.0,
    },
    steps: GOLDEN_PATH_RESPONSE.steps.map((step) => ({
      ...step,
      mentorOrSupervisor: step.stepNumber === 4 ? 'Dr. Rajesh Kumar (CSE Dept)' : 'AI/ML Faculty Team',
      locationOrDept: 'AI Research & High-Performance Computing Lab',
      durationOrDates: 'Fall Semester 2026',
      stipendOrPackage: step.stepNumber === 6 ? '₹18.0 LPA Full-time Offer' : '₹18,000 / mo Stipend',
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
    const queryStepData = buildOpportunityStepsForQuery(message, profileBadge);

    if (host && token && spaceId && message.trim().length > 0) {
      try {
        let activeConvId: string | null =
          conversationId && !conversationId.startsWith('genie-') ? conversationId : null;
        let messageId: string | null = null;
        let initialStatus: string | null = null;
        let genieResponseData: any = null;

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
              genieResponseData = data;
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
            genieResponseData = data;
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
                genieResponseData = pollData;
              }
            } catch (pollErr) {
              console.warn(`[Genie API] Error polling #${retries}:`, pollErr);
            }
          }
        }

        if (genieResponseData) {
          const parsed = parseGenieResponsePayload(genieResponseData);

          if (parsed.explanation && parsed.explanation.trim().length > 0) {
            return NextResponse.json({
              query: message,
              explanation: parsed.explanation,
              sqlQuery: parsed.sqlQuery,
              conversationId: activeConvId || 'genie-conv-1',
              source: 'genie',
              studentProfile: profileBadge,
              steps: queryStepData.steps,
              placementTarget: queryStepData.placementTarget,
            });
          }
        }
      } catch (err) {
        console.warn('[Genie API] Real Genie call error, using fallback:', err);
      }
    }

    // Dynamic Intent Fallback Mode
    const fallbackText = `${profileBadge.studentName}, based on your query "${message}", here is the customized opportunity path:`;

    return NextResponse.json({
      query: message,
      explanation: fallbackText,
      conversationId: conversationId || 'genie-session-fixture',
      source: 'fixture',
      studentProfile: profileBadge,
      steps: queryStepData.steps,
      placementTarget: queryStepData.placementTarget,
    });
  } catch (error) {
    console.error('[Genie API] Unhandled route error:', error);
    const defaultProfile = parseProfileAndGoal('');
    const defaultData = buildOpportunityStepsForQuery('', defaultProfile);

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
