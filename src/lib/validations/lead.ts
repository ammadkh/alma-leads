import { z } from 'zod';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const leadFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(2, 'Please enter your country'),
  linkedinProfile: z.string().url('Invalid LinkedIn URL'),
  visasOfInterest: z.array(z.string()).min(1, 'Please select at least one visa type'),
  resume: z.any()
    .refine((file) => !file || file instanceof File, 'Invalid file')
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      'Max file size is 5MB'
    )
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
      'Only .pdf, .doc and .docx files are accepted'
    )
    .optional(),
  additionalInfo: z.string().optional(),
});

export type LeadFormSchema = z.infer<typeof leadFormSchema>; 