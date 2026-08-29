import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { wardrobeNavigation } from "@/constants/navigation";

export default function WardrobeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell navigation={wardrobeNavigation}>{children}</DashboardShell>
  );
}
