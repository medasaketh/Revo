import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  mockDashboardData,
  mergeDashboardUser,
} from "@/constants/mockDashboard";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import type { Profile } from "@/types/database";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const profile = profileData as Profile | null;
  const firstName =
    profile?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    mockDashboardData.user.name;

  const dashboardData = mergeDashboardUser(mockDashboardData, {
    id: user.id,
    name: firstName,
    email: profile?.email ?? user.email ?? mockDashboardData.user.email,
    avatarUrl: profile?.avatar_url ?? null,
    initials: firstName.slice(0, 2).toUpperCase(),
  });

  return <DashboardContent data={dashboardData} />;
}
