import { NextRequest, NextResponse } from 'next/server';
import {
  getSiteData,
  createInquiryRecord,
  updateInquiryStatusRecord,
} from '@/lib/db-store';

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json({
    engine: data.engine,
    inquiries: data.inquiries,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      company,
      location,
      serviceNeeded,
      projectStage,
      budgetRange,
      timeline,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and project brief are required.' },
        { status: 400 }
      );
    }

    const result = await createInquiryRecord({
      name,
      email,
      phone: phone || '',
      company: company || '',
      location: location || '',
      serviceNeeded: serviceNeeded || 'Software Development',
      projectStage: projectStage || 'New Concept / Greenfield',
      budgetRange: budgetRange || '₹3L – ₹10L / $5k – $15k',
      timeline: timeline || '1 – 2 Months',
      message,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to save inquiry' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json(
        { error: 'Inquiry ID and status are required.' },
        { status: 400 }
      );
    }
    const updated = await updateInquiryStatusRecord(id, status);
    return NextResponse.json({ inquiry: updated });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}
