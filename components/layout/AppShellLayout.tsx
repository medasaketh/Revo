import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { appNavigation } from "@/constants/navigation";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell navigation={appNavigation}>{children}</DashboardShell>
  );
}
