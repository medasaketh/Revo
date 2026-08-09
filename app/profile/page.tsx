import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/types/database";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const profile = profileData as Profile | null;

  return (
    <div className="min-h-screen bg-[#090909] px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="mt-2 text-gray-400">Manage your account details.</p>

        <div className="mt-8 rounded-2xl border border-[#222222] bg-[#111111] p-6">
          <p className="text-sm text-gray-400">
            Profile editing will be available in a future release.
          </p>
          <p className="mt-4 text-white">{profile?.full_name ?? user.email}</p>
        </div>

        <Link href="/dashboard" className="mt-6 inline-block">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
