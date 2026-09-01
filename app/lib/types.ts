export interface OpportunityStep {
  step: number;
  opportunityName: string;
  type: "Project" | "Club" | "Workshop" | "Research" | "Hackathon" | "Placement" | "Bootcamp";
  durationWeeks?: number | string;
  weeklyHours: number;
  why: string;
  prerequisites: string[];
  skillsGained: Array<{ skill: string; level: number }>;
  unlocks: string;
  organizationOrFaculty?: string;
  stipendOrPackage?: string;
}

export interface StudentContext {
  name: string;
  year: number;
  department: string;
  currentSkills: Array<{ skill: string; level: number }>;
  careerGoal: string;
  availableHoursPerWeek: number;
}

export interface GenieReasoning {
  skillGaps: string[];
  totalWeeklyHours: number;
  estimatedWeeksToReady: number;
  confidenceScore: number;
  sqlTrace?: string;
  reasoningSteps: string[];
}

export interface GenieResponse {
  query: string;
  student: StudentContext;
  steps: OpportunityStep[];
  reasoning: GenieReasoning;
  isWhatIf?: boolean;
  whatIfConstraintApplied?: string;
  rawTextResponse?: string;
}

export interface WhatIfPreset {
  id: string;
  label: string;
  query: string;
  description: string;
}

export interface StakeholderCard {
  role: string;
  title: string;
  description: string;
  exampleQuery: string;
  valueMetric: string;
}
