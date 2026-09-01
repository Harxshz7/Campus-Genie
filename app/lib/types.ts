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
  // Extended detailed metadata fields
  mentorOrSupervisor?: string;
  locationOrDept?: string;
  durationOrDates?: string;
  stipendOrPackage?: string;
  techStack?: string[];
}

export interface StudentProfileBadge {
  studentName: string;
  initials: string;
  role: string;
  company: string;
  packageLpa: number;
  department?: string;
  year?: number;
  availableHours?: number;
}

export interface GenieResponse {
  query: string;
  explanation: string;
  sqlQuery?: string;
  steps: OpportunityStep[];
  isWhatIf?: boolean;
  whatIfConstraint?: string;
  conversationId?: string;
  source?: 'genie' | 'fixture';
  studentProfile?: StudentProfileBadge;
  placementTarget?: {
    role: string;
    company: string;
    packageLpa: number;
  };
}
