import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  signAdminToken,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (
      email !== DEFAULT_ADMIN_EMAIL.toLowerCase() ||
      password !== DEFAULT_ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { error: 'Invalid credentials. Please check your email and password.' },
        { status: 401 }
      );
    }

    const user = {
      email: DEFAULT_ADMIN_EMAIL,
      name: 'Infinio Studio Admin',
      role: 'Principal Administrator',
    };

    const token = signAdminToken(user);
    const response = NextResponse.json({
      authenticated: true,
      user,
    });

    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}
