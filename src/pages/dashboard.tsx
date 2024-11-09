// src/pages/dashboard.tsx
import MainLayout from '../components/layout/MainLayout';
import UserDashboard from '../components/dashboard/UserDashboard';

export default function DashboardPage() {
  return (
    <MainLayout title="Your Dashboard - FUN(TIME)">
      <UserDashboard />
    </MainLayout>
  );
}
