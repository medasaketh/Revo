import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="mt-2 text-gray-400">
              Welcome back, {profile?.full_name || user.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="rounded-2xl border border-[#222222] bg-[#111111] p-6">
          <h2 className="mb-4 text-lg font-medium">Your profile</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-[#222222] pb-3">
              <dt className="text-gray-500">Email</dt>
              <dd>{profile?.email ?? user.email}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-[#222222] pb-3">
              <dt className="text-gray-500">Full name</dt>
              <dd>{profile?.full_name || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">Member since</dt>
              <dd>
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "—"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 flex gap-3">
          <Link href="/profile">
            <Button variant="secondary">Profile</Button>
          </Link>
          <Link href="/settings">
            <Button variant="secondary">Settings</Button>
          </Link>
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
