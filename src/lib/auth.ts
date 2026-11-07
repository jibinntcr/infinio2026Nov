import crypto from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'infinio_admin_token';

const SECRET_KEY = process.env.ADMIN_JWT_SECRET || 'infinio-enterprise-portal-secret-2026-kochi';
export const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@infinio.co.in';
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Infinio@2026';

export interface AdminUserPayload {
  email: string;
  name: string;
  role: string;
  exp: number;
}

export function signAdminToken(payload: Omit<AdminUserPayload, 'exp'>): string {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
  const fullPayload: AdminUserPayload = { ...payload, exp };
  const data = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(data)
    .digest('base64url');
  return `${data}.${signature}`;
}

export function verifyAdminToken(token?: string): AdminUserPayload | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(data)
    .digest('base64url');
  if (signature !== expectedSig) return null;
  try {
    const decoded = JSON.parse(Buffer.from(data, 'base64url').toString('utf-8')) as AdminUserPayload;
    if (Date.now() > decoded.exp) return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function getAuthenticatedAdmin(): Promise<AdminUserPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}
