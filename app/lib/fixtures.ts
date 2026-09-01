import { GenieResponse, WhatIfPreset, StakeholderCard } from "./types";

export const GOLDEN_RESPONSE: GenieResponse = {
  query: "I'm Arjun Mehta, a 2nd-year CSE student. I know Java and SQL at an intermediate level. My goal is to become an AI Engineer. What campus opportunities should I pursue and in what order to reach my goal?",
  student: {
    name: "Arjun Mehta",
    year: 2,
    department: "Computer Science & Engineering",
    currentSkills: [
      { skill: "Java", level: 3 },
      { skill: "SQL", level: 3 },
      { skill: "Git", level: 2 },
      { skill: "Linux", level: 2 },
      { skill: "Problem Solving", level: 2 },
    ],
    careerGoal: "AI Engineer",
    availableHoursPerWeek: 15,
  },
  reasoning: {
    skillGaps: ["Python", "Machine Learning", "TensorFlow", "NLP", "Model Deployment"],
    totalWeeklyHours: 12,
    estimatedWeeksToReady: 12,
    confidenceScore: 98,
    reasoningSteps: [
      "Look up student Arjun Mehta: Year 2 CSE, strong Java/SQL foundation, 15h/week available.",
      "Identify target placement 'TechCorp AI Engineer' (18 LPA) requiring Python[3], ML[3], TensorFlow[2], NLP[2], Model Deployment[2].",
      "Compute skill gaps: Arjun has zero formal Python/ML/DL skills, but meets prerequisites for intermediate software projects.",
      "Step 1: Leverage Java+SQL into 'Campus Backend API' project to bridge into Python[2] & REST APIs.",
      "Step 2: Enroll in 'AI/ML Club' requiring Python[1] to learn ML[2] & Statistics[2].",
      "Step 3: Attend intensive 'Applied AI Workshop' to gain hands-on TensorFlow[3] and Model Deployment[2].",
      "Step 4: Qualify for Dr. Rajesh Kumar's 'NLP for Indian Languages' Research Assistantship to attain NLP[4] and DL[3].",
      "Step 5: Compete in 'DataHack 2026' Hackathon for end-to-end ML project portfolio proof.",
      "Step 6: Complete all prerequisites for TechCorp AI Engineer role.",
    ],
    sqlTrace: `-- Multi-Hop Opportunity Graph Traversal
WITH target_reqs AS (
  SELECT ps.skill_id, s.skill_name, ps.min_proficiency
  FROM placements p
  JOIN placement_skills ps ON p.placement_id = ps.placement_id
  JOIN skills s ON ps.skill_id = s.skill_id
  WHERE p.role LIKE '%AI Engineer%'
),
student_state AS (
  SELECT ss.skill_id, ss.proficiency_level
  FROM student_skills ss
  WHERE ss.student_id = 1
),
gaps AS (
  SELECT t.skill_id, t.skill_name, t.min_proficiency,
         COALESCE(s.proficiency_level, 0) AS current_level
  FROM target_reqs t
  LEFT JOIN student_state s ON t.skill_id = s.skill_id
  WHERE COALESCE(s.proficiency_level, 0) < t.min_proficiency
)
SELECT 'Project' AS entity_type, p.title, sk.skill_name, ps.proficiency_level
FROM projects p
JOIN project_skills ps ON p.project_id = ps.project_id AND ps.relation_type = 'teaches'
JOIN skills sk ON ps.skill_id = sk.skill_id
WHERE sk.skill_id IN (SELECT skill_id FROM gaps);`,
  },
  steps: [
    {
      step: 1,
      opportunityName: "Campus Backend API",
      type: "Project",
      durationWeeks: "Weeks 1–8",
      weeklyHours: 6,
      why: "Builds on your existing Java & SQL strengths while bridging you directly into Python syntax and RESTful API architecture without prerequisite friction.",
      prerequisites: ["Java [Level 2]", "SQL [Level 2]"],
      skillsGained: [
        { skill: "Python", level: 2 },
        { skill: "REST APIs", level: 3 },
        { skill: "Docker", level: 2 },
      ],
      unlocks: "Unlocks membership in the AI/ML Club and Python-dependent data projects.",
      organizationOrFaculty: "Campus Open Source Initiative",
    },
    {
      step: 2,
      opportunityName: "AI/ML Student Club",
      type: "Club",
      durationWeeks: "Weeks 3–Ongoing",
      weeklyHours: 4,
      why: "Fills foundational Machine Learning and applied statistics gaps in a collaborative peer study group while practicing Python.",
      prerequisites: ["Python [Level 1]"],
      skillsGained: [
        { skill: "Machine Learning", level: 2 },
        { skill: "Statistics", level: 2 },
        { skill: "Scikit-Learn", level: 2 },
      ],
      unlocks: "Qualifies you for hands-on deep learning workshops and intermediate hackathons.",
      organizationOrFaculty: "Department of Computing",
    },
    {
      step: 3,
      opportunityName: "Applied AI & Deep Learning Workshop",
      type: "Workshop",
      durationWeeks: "Weeks 5–6",
      weeklyHours: 4,
      why: "Hands-on neural network training and model deployment directly mapped to the TensorFlow requirements of tier-1 AI placements.",
      prerequisites: ["Python [Level 2]", "Machine Learning [Level 1]"],
      skillsGained: [
        { skill: "TensorFlow", level: 3 },
        { skill: "Model Deployment", level: 2 },
        { skill: "End-to-End ML", level: 2 },
      ],
      unlocks: "Unlocks eligibility for faculty-led NLP and Computer Vision research positions.",
      organizationOrFaculty: "Center for Artificial Intelligence",
    },
    {
      step: 4,
      opportunityName: "NLP for Indian Languages Lab",
      type: "Research",
      durationWeeks: "Weeks 7–16",
      weeklyHours: 8,
      why: "Deepens your Natural Language Processing capabilities to Level 4 through publication-grade experimentation under faculty supervision.",
      prerequisites: ["Python [Level 3]", "Machine Learning [Level 2]", "NLP [Level 1]"],
      skillsGained: [
        { skill: "NLP", level: 4 },
        { skill: "Deep Learning", level: 3 },
        { skill: "Research Methods", level: 3 },
      ],
      unlocks: "High-value portfolio capstone and strong faculty recommendation for top AI positions.",
      organizationOrFaculty: "Dr. Rajesh Kumar (Dept of CSE)",
    },
    {
      step: 5,
      opportunityName: "DataHack 2026 Annual Hackathon",
      type: "Hackathon",
      durationWeeks: "Week 10 (Weekend)",
      weeklyHours: 12,
      why: "Stress-tests your end-to-end ML deployment speed and proves your ability to ship AI solutions under tight deadlines in multidisciplinary teams.",
      prerequisites: ["Python [Level 2]", "Machine Learning [Level 2]"],
      skillsGained: [
        { skill: "End-to-End ML", level: 3 },
        { skill: "Teamwork & Collaboration", level: 3 },
        { skill: "Technical Pitching", level: 3 },
      ],
      unlocks: "Direct placement interview fast-track and hackathon portfolio proof.",
      organizationOrFaculty: "ACM Student Chapter",
    },
    {
      step: 6,
      opportunityName: "TechCorp AI Engineer Placement",
      type: "Placement",
      durationWeeks: "Placement Season",
      weeklyHours: 0,
      why: "All 5 requisite competencies (Python, ML, TensorFlow, NLP, Model Deployment) are fully met at or above the company's minimum threshold.",
      prerequisites: ["Python [Level 3]", "ML [Level 3]", "TensorFlow [Level 2]", "NLP [Level 2]"],
      skillsGained: [
        { skill: "Production AI Engineering", level: 4 },
        { skill: "Career Placement", level: 5 },
      ],
      unlocks: "Full-time role starting at 18.0 LPA with career acceleration.",
      stipendOrPackage: "18.0 LPA Package",
      organizationOrFaculty: "TechCorp Systems",
    },
  ],
};

export const WHAT_IF_5_HOURS: GenieResponse = {
  query: "What if Arjun only has 5 hours per week available?",
  isWhatIf: true,
  whatIfConstraintApplied: "Weekly Extracurricular Hours <= 5h/week",
  student: {
    ...GOLDEN_RESPONSE.student,
    availableHoursPerWeek: 5,
  },
  reasoning: {
    skillGaps: ["Python", "Machine Learning", "TensorFlow", "NLP", "Model Deployment"],
    totalWeeklyHours: 4.5,
    estimatedWeeksToReady: 20,
    confidenceScore: 94,
    reasoningSteps: [
      "Constraint Applied: Hard limit of <= 5 hours per week.",
      "Removed: 8h/week NLP Research Assistantship (exceeds budget).",
      "Removed: 6h/week Campus Backend API project.",
      "Substituted: 3h/week 'Peer Python Sprint' and 2h/week 'NLP Transformers Seminar'.",
      "Spread timeline: Extended from 12 weeks to 20 weeks to maintain academic balance.",
      "Outcome: Attains same required skill profile without academic overload.",
    ],
    sqlTrace: `-- Constraint Re-planning: Filter by weekly_hours <= 5
SELECT 'Project' AS type, p.title, p.weekly_hours, ps.proficiency_level
FROM projects p
JOIN project_skills ps ON p.project_id = ps.project_id
WHERE p.weekly_hours <= 5 AND ps.relation_type = 'teaches'
UNION ALL
SELECT 'Club', c.name, c.weekly_hours, cs.proficiency_level
FROM clubs c
JOIN club_skills cs ON c.club_id = cs.club_id
WHERE c.weekly_hours <= 4;`,
  },
  steps: [
    {
      step: 1,
      opportunityName: "Peer Python Study Cohort",
      type: "Bootcamp",
      durationWeeks: "Weeks 1–6",
      weeklyHours: 3,
      why: "Low time commitment micro-cohort that provides accelerated Python fundamentals in 3 hours/week without heavy project overhead.",
      prerequisites: ["Java [Level 2]"],
      skillsGained: [{ skill: "Python", level: 2 }],
      unlocks: "Unlocks club participation and online workshops.",
      organizationOrFaculty: "Peer Learning Network",
    },
    {
      step: 2,
      opportunityName: "AI/ML Student Club (Bi-weekly Track)",
      type: "Club",
      durationWeeks: "Weeks 4–14",
      weeklyHours: 2,
      why: "Auditing bi-weekly sessions to grasp Machine Learning and Scikit-Learn without taking on heavy leadership duties.",
      prerequisites: ["Python [Level 1]"],
      skillsGained: [
        { skill: "Machine Learning", level: 2 },
        { skill: "Scikit-Learn", level: 2 },
      ],
      unlocks: "Qualifies you for short weekend hackathons.",
      organizationOrFaculty: "Department of Computing",
    },
    {
      step: 3,
      opportunityName: "Applied AI Workshop Series",
      type: "Workshop",
      durationWeeks: "Weeks 8–10",
      weeklyHours: 3,
      why: "Compact weekend modules focusing on TensorFlow model development and lightweight deployment.",
      prerequisites: ["Python [Level 2]", "Machine Learning [Level 1]"],
      skillsGained: [
        { skill: "TensorFlow", level: 2 },
        { skill: "Model Deployment", level: 2 },
      ],
      unlocks: "Preparation for campus hackathon challenge.",
      organizationOrFaculty: "Center for AI",
    },
    {
      step: 4,
      opportunityName: "NLP with Transformers Seminar",
      type: "Workshop",
      durationWeeks: "Weeks 12–14",
      weeklyHours: 2,
      why: "Replaces heavy 8h/week lab research with a focused 2h/week seminar covering modern NLP architectures.",
      prerequisites: ["Python [Level 2]", "Machine Learning [Level 2]"],
      skillsGained: [
        { skill: "NLP", level: 2 },
        { skill: "Deep Learning", level: 2 },
      ],
      unlocks: "Sufficient NLP mastery for technical interview rounds.",
      organizationOrFaculty: "Dr. Rajesh Kumar",
    },
    {
      step: 5,
      opportunityName: "TechCorp AI Engineer Placement",
      type: "Placement",
      durationWeeks: "Semester 6",
      weeklyHours: 0,
      why: "All foundational skill benchmarks achieved under strict 5h/week constraint.",
      prerequisites: ["Python [Level 2+]", "ML [Level 2+]", "TensorFlow [Level 2]"],
      skillsGained: [{ skill: "AI Engineering", level: 4 }],
      unlocks: "Full-time placement offer.",
      stipendOrPackage: "18.0 LPA Package",
      organizationOrFaculty: "TechCorp Systems",
    },
  ],
};

export const WHAT_IF_PYTHON_KNOWN: GenieResponse = {
  query: "If Arjun already knew Python at an intermediate level, how would his opportunity path to AI Engineer change?",
  isWhatIf: true,
  whatIfConstraintApplied: "Current Skills includes Python [Level 3]",
  student: {
    ...GOLDEN_RESPONSE.student,
    currentSkills: [
      ...GOLDEN_RESPONSE.student.currentSkills,
      { skill: "Python", level: 3 },
    ],
  },
  reasoning: {
    skillGaps: ["Machine Learning", "TensorFlow", "NLP", "Model Deployment"],
    totalWeeklyHours: 12,
    estimatedWeeksToReady: 6,
    confidenceScore: 99,
    reasoningSteps: [
      "Constraint Applied: Python already mastered at Level 3.",
      "Optimization: Bypass Step 1 'Campus Backend API' entirely.",
      "Fast-Track: Direct day-1 entry into AI/ML Club and Dr. Kumar's NLP Research.",
      "Timeline compression: Timeline shortened from 12 weeks to 6 weeks.",
    ],
    sqlTrace: `-- Fast-track query: filter out Python-teaching starter projects
SELECT p.title, r.skill_name FROM projects p
JOIN project_skills r ON p.project_id = r.project_id
WHERE r.skill_id NOT IN (SELECT skill_id FROM student_skills WHERE student_id = 1);`,
  },
  steps: [
    {
      step: 1,
      opportunityName: "AI/ML Student Club (Advanced Lead Track)",
      type: "Club",
      durationWeeks: "Weeks 1–6",
      weeklyHours: 4,
      why: "Because you already possess Python 3, you immediately skip beginner syntax training and jump straight into training complex models.",
      prerequisites: ["Python [Level 2]"],
      skillsGained: [
        { skill: "Machine Learning", level: 3 },
        { skill: "Statistics", level: 3 },
      ],
      unlocks: "Immediate eligibility for Dr. Kumar's research lab.",
      organizationOrFaculty: "Department of Computing",
    },
    {
      step: 2,
      opportunityName: "Applied AI & Deep Learning Workshop",
      type: "Workshop",
      durationWeeks: "Weeks 2–3",
      weeklyHours: 4,
      why: "Fast-tracks TensorFlow and PyTorch proficiency in two intensive weeks.",
      prerequisites: ["Python [Level 3]"],
      skillsGained: [
        { skill: "TensorFlow", level: 3 },
        { skill: "Model Deployment", level: 3 },
      ],
      unlocks: "Lead researcher nomination.",
      organizationOrFaculty: "Center for AI",
    },
    {
      step: 3,
      opportunityName: "NLP for Indian Languages Lab",
      type: "Research",
      durationWeeks: "Weeks 3–12",
      weeklyHours: 8,
      why: "Started 4 weeks earlier than the standard path, enabling you to publish a workshop paper prior to placement season.",
      prerequisites: ["Python [Level 3]", "Machine Learning [Level 2]"],
      skillsGained: [
        { skill: "NLP", level: 4 },
        { skill: "Deep Learning", level: 4 },
      ],
      unlocks: "Top-tier AI researcher credentials.",
      organizationOrFaculty: "Dr. Rajesh Kumar",
    },
    {
      step: 4,
      opportunityName: "TechCorp AI Engineer Placement",
      type: "Placement",
      durationWeeks: "Ready Now",
      weeklyHours: 0,
      why: "Ready for interviews 6 weeks ahead of standard timeline.",
      prerequisites: ["Python [Level 3]", "ML [Level 3]"],
      skillsGained: [{ skill: "AI Placement", level: 5 }],
      unlocks: "Career launch at 18 LPA.",
      stipendOrPackage: "18.0 LPA",
      organizationOrFaculty: "TechCorp Systems",
    },
  ],
};

export const WHAT_IF_DATA_SCIENTIST: GenieResponse = {
  query: "What if Arjun wanted to become a Data Scientist instead of an AI Engineer?",
  isWhatIf: true,
  whatIfConstraintApplied: "Target Goal: Data Scientist (DataMinds Analytics - 16 LPA)",
  student: {
    ...GOLDEN_RESPONSE.student,
    careerGoal: "Data Scientist",
  },
  reasoning: {
    skillGaps: ["Python", "Data Analysis", "Data Visualization", "Statistics", "Predictive Modeling"],
    totalWeeklyHours: 10,
    estimatedWeeksToReady: 10,
    confidenceScore: 97,
    reasoningSteps: [
      "Target Changed: Data Scientist role at DataMinds Analytics.",
      "Arjun's SQL[3] is an immediate strong asset for Data Science.",
      "Targeting data visualization, business statistics, and predictive analytics over deep learning / NLP.",
      "Connecting path through Data Analytics Club and Predictive Modeling Research.",
    ],
  },
  steps: [
    {
      step: 1,
      opportunityName: "Data Analytics Student Chapter",
      type: "Club",
      durationWeeks: "Weeks 1–6",
      weeklyHours: 4,
      why: "Directly pairs your strong SQL skills with Python Pandas and exploratory data analysis.",
      prerequisites: ["SQL [Level 2]"],
      skillsGained: [
        { skill: "Python", level: 2 },
        { skill: "Data Analysis", level: 3 },
        { skill: "Data Visualization", level: 3 },
      ],
      unlocks: "Predictive Analytics Research eligibility.",
      organizationOrFaculty: "Analytics Society",
    },
    {
      step: 2,
      opportunityName: "Statistical Modeling & Econometrics Bootcamp",
      type: "Workshop",
      durationWeeks: "Weeks 4–5",
      weeklyHours: 4,
      why: "Bridges core statistics and hypothesis testing demanded by data science hiring panels.",
      prerequisites: ["SQL [Level 2]"],
      skillsGained: [
        { skill: "Statistics", level: 3 },
        { skill: "A/B Testing", level: 2 },
      ],
      unlocks: "Faculty research matching.",
      organizationOrFaculty: "Department of Mathematics & Computing",
    },
    {
      step: 3,
      opportunityName: "Predictive Analytics for Healthcare Research",
      type: "Research",
      durationWeeks: "Weeks 6–14",
      weeklyHours: 6,
      why: "Real-world clinical dataset analysis under Prof. Meenakshi Sharma.",
      prerequisites: ["Statistics [Level 2]", "Data Analysis [Level 2]"],
      skillsGained: [
        { skill: "Machine Learning", level: 3 },
        { skill: "Predictive Modeling", level: 3 },
      ],
      unlocks: "Data Science placement portfolio.",
      organizationOrFaculty: "Prof. Meenakshi Sharma",
    },
    {
      step: 4,
      opportunityName: "DataMinds Analytics Data Scientist Placement",
      type: "Placement",
      durationWeeks: "Placement Cycle",
      weeklyHours: 0,
      why: "Full alignment across SQL, Statistics, Data Visualization, and Predictive Modeling.",
      prerequisites: ["SQL [Level 3]", "Python [Level 3]", "Data Analysis [Level 3]"],
      skillsGained: [{ skill: "Data Science Placement", level: 5 }],
      unlocks: "16.0 LPA Data Science position.",
      stipendOrPackage: "16.0 LPA Package",
      organizationOrFaculty: "DataMinds Analytics",
    },
  ],
};

export const SAMPLE_PRESETS: WhatIfPreset[] = [
  {
    id: "golden",
    label: "Golden Demo: Arjun Mehta (AI Engineer)",
    query: "I'm Arjun Mehta, a 2nd-year CSE student. I know Java and SQL at an intermediate level. My goal is to become an AI Engineer. What campus opportunities should I pursue and in what order to reach my goal?",
    description: "Multi-hop graph traversal bridging Java+SQL into AI Engineer at 18 LPA.",
  },
  {
    id: "time_5h",
    label: "What-If: Limit to 5 Hours / Week",
    query: "What if Arjun only has 5 hours per week available?",
    description: "Re-plans around a strict time constraint by filtering out heavy research.",
  },
  {
    id: "knows_python",
    label: "What-If: Already Knows Python",
    query: "If Arjun already knew Python at an intermediate level, how would his opportunity path to AI Engineer change?",
    description: "Skips foundational syntax steps and fast-tracks the path by 6 weeks.",
  },
  {
    id: "data_scientist",
    label: "What-If: Switch Goal to Data Scientist",
    query: "What if Arjun wanted to become a Data Scientist instead of an AI Engineer?",
    description: "Adapts graph traversal to emphasize SQL, statistics, and business analytics.",
  },
  {
    id: "priya_pm",
    label: "Student 2: Priya Sharma (Product Manager)",
    query: "Priya Sharma is a 2nd-year CSE student who knows HTML/CSS and JavaScript. She wants to become a Product Manager. What is her best opportunity path?",
    description: "Maps design thinking, UI/UX sprints, and business hackathons to an APM role.",
  },
  {
    id: "sneha_iot",
    label: "Student 3: Sneha Reddy (IoT Developer)",
    query: "Sneha Reddy is a 2nd-year ECE student with circuits knowledge interested in IoT Development. What is her path?",
    description: "Cross-departmental path connecting hardware lab, IoT club, and smart campus research.",
  },
];

export const STAKEHOLDER_CARDS: StakeholderCard[] = [
  {
    role: "FACULTY",
    title: "Research Candidate Discovery",
    description: "Instantly find undergraduate and graduate students who meet the prerequisite skill thresholds for grant-funded research labs.",
    exampleQuery: "Which students qualify for Dr. Rajesh Kumar's NLP research lab?",
    valueMetric: "Eliminate manual CV vetting",
  },
  {
    role: "PLACEMENT CELL",
    title: "Targeted Cohort Readiness",
    description: "Track pipeline readiness for marquee placement partners months ahead of recruitment drives and pinpoint departmental skill gaps.",
    exampleQuery: "How many students meet >= 70% of TechCorp AI Engineer requirements?",
    valueMetric: "Actionable placement pipeline data",
  },
  {
    role: "CLUB LEADS",
    title: "Skill-Based Recruitment",
    description: "Identify freshmen and sophomores with high enthusiasm and prerequisite competencies to recruit as active contributors.",
    exampleQuery: "Which students know Python basics and want to learn ML?",
    valueMetric: "3x higher active retention",
  },
  {
    role: "ADMINISTRATION",
    title: "Campus Curriculum Insights",
    description: "Discover which skills have massive industry demand but low student supply across departments to inform syllabus updates.",
    exampleQuery: "What are the top 10 in-demand skills vs student distribution?",
    valueMetric: "Data-driven curriculum evolution",
  },
];

export function getFixtureForQuery(query: string): GenieResponse {
  const q = query.toLowerCase();
  if (q.includes("5 hour") || q.includes("5 hrs") || q.includes("5hr") || q.includes("only have 5")) {
    return WHAT_IF_5_HOURS;
  }
  if (q.includes("already knew python") || q.includes("knows python") || q.includes("already know python")) {
    return WHAT_IF_PYTHON_KNOWN;
  }
  if (q.includes("data scientist") || q.includes("data science")) {
    return WHAT_IF_DATA_SCIENTIST;
  }
  if (q.includes("priya") || q.includes("product manager")) {
    return {
      query,
      student: {
        name: "Priya Sharma",
        year: 2,
        department: "Computer Science & Engineering",
        currentSkills: [
          { skill: "HTML/CSS", level: 3 },
          { skill: "JavaScript", level: 3 },
          { skill: "UI/UX Awareness", level: 2 },
          { skill: "Communication", level: 3 },
        ],
        careerGoal: "Associate Product Manager",
        availableHoursPerWeek: 12,
      },
      reasoning: {
        skillGaps: ["Product Management", "User Research", "Metrics & Analytics", "Product Strategy"],
        totalWeeklyHours: 10,
        estimatedWeeksToReady: 10,
        confidenceScore: 96,
        reasoningSteps: [
          "Identified Priya Sharma: Front-end developer with strong communication seeking APM roles.",
          "Target placement: 'ProductHive APM' (15 LPA).",
          "Connecting design thinking clubs, product sprints, and cross-functional hackathons.",
        ],
      },
      steps: [
        {
          step: 1,
          opportunityName: "Design Thinking & Innovation Lab",
          type: "Club",
          durationWeeks: "Weeks 1–6",
          weeklyHours: 4,
          why: "Converts UI/UX understanding into rigorous user journey mapping and problem discovery.",
          prerequisites: ["HTML/CSS [Level 2]"],
          skillsGained: [
            { skill: "User Research", level: 3 },
            { skill: "Product Wireframing", level: 3 },
          ],
          unlocks: "Product Sprint eligibility.",
          organizationOrFaculty: "Design Innovation Cell",
        },
        {
          step: 2,
          opportunityName: "Campus Product Sprint Workshop",
          type: "Workshop",
          durationWeeks: "Weeks 4–5",
          weeklyHours: 4,
          why: "Hands-on product requirement document (PRD) writing, roadmap prioritization, and telemetry design.",
          prerequisites: ["User Research [Level 2]"],
          skillsGained: [
            { skill: "Product Management", level: 3 },
            { skill: "Metrics & Telemetry", level: 2 },
          ],
          unlocks: "Leadership role in university hackathons.",
          organizationOrFaculty: "E-Cell",
        },
        {
          step: 3,
          opportunityName: "Startup Weekend 54-Hour Hackathon",
          type: "Hackathon",
          durationWeeks: "Weekend",
          weeklyHours: 10,
          why: "Acts as Product Lead for a multi-disciplinary developer/designer team pitching to angel investors.",
          prerequisites: ["Product Management [Level 2]"],
          skillsGained: [
            { skill: "Pitching & Presentation", level: 3 },
            { skill: "Product Strategy", level: 3 },
          ],
          unlocks: "Direct interview fast-track with ProductHive.",
          organizationOrFaculty: "Campus Incubator",
        },
        {
          step: 4,
          opportunityName: "ProductHive APM Placement",
          type: "Placement",
          durationWeeks: "Placement Season",
          weeklyHours: 0,
          why: "All prerequisite product acumen, metrics awareness, and cross-functional leadership proven through projects.",
          prerequisites: ["Product Strategy [Level 3]", "User Research [Level 3]"],
          skillsGained: [{ skill: "Associate Product Management", level: 5 }],
          unlocks: "15.0 LPA APM Career Track.",
          stipendOrPackage: "15.0 LPA Package",
          organizationOrFaculty: "ProductHive Technologies",
        },
      ],
    };
  }
  if (q.includes("sneha") || q.includes("iot") || q.includes("ece")) {
    return {
      query,
      student: {
        name: "Sneha Reddy",
        year: 2,
        department: "Electronics & Communication Engineering",
        currentSkills: [
          { skill: "Digital Electronics", level: 3 },
          { skill: "C Programming", level: 3 },
          { skill: "Microcontrollers", level: 2 },
        ],
        careerGoal: "IoT Systems Engineer",
        availableHoursPerWeek: 12,
      },
      reasoning: {
        skillGaps: ["Embedded Linux", "MQTT & IoT Protocols", "Sensor Telemetry", "Edge AI"],
        totalWeeklyHours: 9,
        estimatedWeeksToReady: 12,
        confidenceScore: 97,
        reasoningSteps: [
          "Identified Sneha Reddy: ECE sophomore with core C/Microcontroller foundation.",
          "Target role: 'ConnectedEdge IoT Systems Engineer' (14 LPA).",
          "Connecting embedded hardware lab with cloud telemetry and edge computing projects.",
        ],
      },
      steps: [
        {
          step: 1,
          opportunityName: "Smart Campus Sensor Grid Project",
          type: "Project",
          durationWeeks: "Weeks 1–8",
          weeklyHours: 5,
          why: "Hands-on deployment of ESP32 and STM32 sensor nodes streaming telemetry across campus WiFi.",
          prerequisites: ["C Programming [Level 2]", "Digital Electronics [Level 2]"],
          skillsGained: [
            { skill: "MQTT & IoT Protocols", level: 3 },
            { skill: "Embedded C", level: 3 },
          ],
          unlocks: "IoT Research Lab access.",
          organizationOrFaculty: "ECE Department Makerspace",
        },
        {
          step: 2,
          opportunityName: "Edge Computing & TinyML Workshop",
          type: "Workshop",
          durationWeeks: "Weeks 6–7",
          weeklyHours: 4,
          why: "Learn to deploy lightweight quantized neural models directly onto microcontroller units.",
          prerequisites: ["Embedded C [Level 2]"],
          skillsGained: [
            { skill: "Edge AI / TinyML", level: 2 },
            { skill: "Firmware Optimization", level: 3 },
          ],
          unlocks: "Faculty research grant project.",
          organizationOrFaculty: "Center for Embedded Systems",
        },
        {
          step: 3,
          opportunityName: "ConnectedEdge IoT Systems Placement",
          type: "Placement",
          durationWeeks: "Placement Season",
          weeklyHours: 0,
          why: "Firmware, IoT protocols, and Edge AI competencies verified via campus sensor network deployments.",
          prerequisites: ["Embedded C [Level 3]", "IoT Protocols [Level 3]"],
          skillsGained: [{ skill: "IoT Engineering", level: 5 }],
          unlocks: "14.0 LPA IoT Systems role.",
          stipendOrPackage: "14.0 LPA Package",
          organizationOrFaculty: "ConnectedEdge Labs",
        },
      ],
    };
  }

  // Default fallback: Golden Path response with the user's custom query reflected
  return {
    ...GOLDEN_RESPONSE,
    query,
  };
}
