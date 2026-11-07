import { NextResponse } from 'next/server';
import { ensureSeededAndFetchAll } from '@/lib/db-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await ensureSeededAndFetchAll();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/site:', error);
    return NextResponse.json(
      { error: 'Failed to load site data' },
      { status: 500 }
    );
  }
}
