import { NextRequest, NextResponse } from 'next/server';
import { getSiteData, createProjectRecord } from '@/lib/db-store';

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json({
    engine: data.engine,
    projects: data.projects,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.client || !body.tagline) {
      return NextResponse.json(
        { error: 'Client name and tagline are required.' },
        { status: 400 }
      );
    }
    const project = await createProjectRecord(body);
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create project' },
      { status: 500 }
    );
  }
}
