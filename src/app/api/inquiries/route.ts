import { NextResponse } from 'next/server';
import {
  createInquiryRecord,
  updateInquiryStatusRecord,
  deleteInquiryRecord,
} from '@/lib/db-store';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      location,
      serviceNeeded,
      serviceInterest,
      projectStage,
      budgetRange,
      budget,
      timeline,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and project details are required.' },
        { status: 400 }
      );
    }

    const result = await createInquiryRecord({
      name,
      email,
      phone: phone || '',
      company: company || 'Enterprise Organization',
      location: location || 'India / GCC',
      serviceNeeded: serviceNeeded || serviceInterest || 'AI & Software Engineering',
      projectStage: projectStage || 'Architecture & Delivery',
      budgetRange: budgetRange || budget || 'Strategic Engagement',
      timeline: timeline || '1 – 3 Months',
      message,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to save inquiry' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized. Admin login required.' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
    }
    const updated = await updateInquiryStatusRecord(id, status);
    return NextResponse.json({ inquiry: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized. Admin login required.' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 });
    }
    await deleteInquiryRecord(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
