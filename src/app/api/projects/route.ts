import { NextResponse } from 'next/server';
import { createProjectRecord, deleteProjectRecord } from '@/lib/db-store';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized. Admin login required.' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const {
      title,
      tagline,
      client,
      location,
      category,
      summary,
      description,
      metrics,
      deliverables,
      tags,
      year,
      liveUrl,
    } = body;

    const finalTagline = tagline || title;
    const finalDesc = description || summary || finalTagline;

    if (!client || !finalTagline) {
      return NextResponse.json(
        { error: 'Client and project title/tagline are required.' },
        { status: 400 }
      );
    }

    const parsedMetrics = Array.isArray(metrics)
      ? metrics.map((m: any) =>
          typeof m === 'string' ? { label: 'Outcome', value: m } : m
        )
      : typeof metrics === 'string'
      ? metrics
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
          .map((val: string, idx: number) => ({
            label: idx === 0 ? 'Impact' : 'SLA',
            value: val,
          }))
      : [
          { label: 'Uptime', value: '99.98%' },
          { label: 'Delivery', value: 'Enterprise' },
        ];

    const parsedDeliverables = Array.isArray(deliverables)
      ? deliverables
      : typeof tags === 'string'
      ? tags
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
      : ['Next.js', 'MongoDB', 'Cloud Architecture'];

    const project = await createProjectRecord({
      client,
      location: location || 'Kochi · Dubai',
      category: category || 'Enterprise Platform',
      tagline: finalTagline,
      description: finalDesc,
      metrics: parsedMetrics,
      deliverables: parsedDeliverables,
      year: year || '2026',
      liveUrl,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create project' },
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
    const slug = searchParams.get('slug') || searchParams.get('id');
    if (!slug) {
      return NextResponse.json({ error: 'Project slug is required.' }, { status: 400 });
    }
    await deleteProjectRecord(slug);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete project' },
      { status: 500 }
    );
  }
}
