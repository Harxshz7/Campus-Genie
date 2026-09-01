export interface StudentProfile {
  name: string;
  year: number;
  department: string;
  careerGoal: string;
  availableHoursPerWeek: number;
  gpa: number;
  currentSkills: { name: string; level: number }[];
}

export type OpportunityType = 'Project' | 'Club' | 'Event' | 'Research' | 'Hackathon' | 'Placement';

export interface OpportunityStep {
  stepNumber: number;
  title: string;
  type: OpportunityType;
  whyFits: string;
  prerequisites: string;
  weeklyHours: number;
  unlocks: string;
  noteColor?: 'yellow' | 'cyan' | 'pink' | 'mint';
  isModified?: boolean;
  originalTitle?: string;
}

export interface GenieResponse {
  query: string;
  explanation: string;
  steps: OpportunityStep[];
  isWhatIf?: boolean;
  whatIfConstraint?: string;
  placementTarget?: {
    role: string;
    company: string;
    packageLpa: number;
  };
}
