export type LeadStatus = 'PENDING' | 'REACHED_OUT';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedinProfile: string;
  visasOfInterest: string[];
  resumeUrl?: string;
  additionalInfo?: string;
  status: LeadStatus;
  country: string;
  submittedAt: Date;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedinProfile: string;
  visasOfInterest: string[];
  resume?: File;
  additionalInfo?: string;
} 