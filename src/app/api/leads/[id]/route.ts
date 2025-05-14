import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { leads } from '../route';  // Import the leads array

const updateLeadSchema = z.object({
  status: z.enum(['PENDING', 'REACHED_OUT']),
});

export async function PATCH(
  request: Request,
  { params }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = updateLeadSchema.parse(body);

    // Find and update the lead in the array
    const leadIndex = leads.findIndex(lead => lead.id === params.id);
    if (leadIndex === -1) {
      return NextResponse.json(
        { message: 'Lead not found' },
        { status: 404 }
      );
    }

    // Update the lead status
    leads[leadIndex] = {
      ...leads[leadIndex],
      status: validatedData.status
    };

    return NextResponse.json(
      { 
        message: 'Lead status updated successfully',
        leadId: params.id,
        newStatus: validatedData.status
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid request data', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating lead status:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 