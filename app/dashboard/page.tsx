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
  const displayName =
    profile?.full_name?.trim() ||
    user.user_metadata?.full_name?.trim() ||
    user.email?.split("@")[0] ||
    mockDashboardData.user.name;

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part: string) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const dashboardData = mergeDashboardUser(mockDashboardData, {
    id: user.id,
    name: displayName,
    email: profile?.email ?? user.email ?? mockDashboardData.user.email,
    avatarUrl: profile?.avatar_url ?? null,
    initials,
  });

  return <DashboardContent data={dashboardData} />;
}
