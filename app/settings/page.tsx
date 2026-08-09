import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-[#090909] px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-2 text-gray-400">Account and security preferences.</p>

        <div className="mt-8 rounded-2xl border border-[#222222] bg-[#111111] p-6">
          <p className="text-sm text-gray-400">
            Settings will be available in a future release.
          </p>
        </div>

        <Link href="/dashboard" className="mt-6 inline-block">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
