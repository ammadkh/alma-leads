import { NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validations/lead';
import { z } from 'zod';
import type { Lead } from '@/types/lead';

// Mock database for demo purposes
export const leads: Lead[] = [];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Convert FormData to a plain object
    const rawData: Record<string, string | File | string[]> = {};
    formData.forEach((value, key) => {
      if (key === 'visasOfInterest') {
        rawData[key] = JSON.parse(value as string);
      } else {
        rawData[key] = value;
      }
    });

    // Validate the data
    const validatedData = leadFormSchema.parse(rawData);

    // In a real application, you would:
    // 1. Upload the resume file to a storage service (e.g., S3)
    // 2. Store the lead data in a database
    // 3. Send a notification email
    // For now, we'll just store it in memory
    const newLead: Lead = {
      id: crypto.randomUUID(),
      ...validatedData,
      status: 'PENDING',
      submittedAt: new Date(),
    };

    leads.push(newLead);

    return NextResponse.json(
      { message: 'Lead submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Error processing lead submission:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // In a real application, you would fetch this from a database
  return NextResponse.json(leads);
} 