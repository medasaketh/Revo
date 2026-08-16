import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

function ResetFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090909]">
      <p className="text-gray-400">Loading...</p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
