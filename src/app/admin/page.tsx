import { redirect } from 'next/navigation';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { getSiteData } from '@/lib/db-store';
import AdminDashboardClient from '@/components/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminPortalPage() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const initialData = await getSiteData();

  return <AdminDashboardClient admin={admin} initialData={initialData} />;
}
