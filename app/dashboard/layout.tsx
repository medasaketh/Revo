import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { mockDashboardData } from "@/constants/mockDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell navigation={mockDashboardData.navigation}>
      {children}
    </DashboardShell>
  );
}
