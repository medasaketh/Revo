"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField, AuthFooterLink } from "@/components/auth/FormField";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { resetPasswordSchema, type ResetPasswordInput } from "@/schemas/auth";

type PageState = "loading" | "ready" | "invalid";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pageState, setPageState] = useState<PageState>("loading");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    async function establishRecoverySession() {
      const supabase = createClient();

      const linkError = searchParams.get("error");
      if (linkError === "link_expired") {
        setPageState("invalid");
        toast.error("This reset link has expired. Request a new one.");
        return;
      }

      // PKCE: code may land here if redirect URL points directly to /reset-password
      const code = searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error("[reset-password] Code exchange failed:", error.message);
          setPageState("invalid");
          return;
        }
        router.replace("/reset-password");
      }

      // Implicit flow fallback: tokens in URL hash
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = hash.get("access_token");
        const refreshToken = hash.get("refresh_token");
        const type = hash.get("type");

        if (accessToken && refreshToken && type === "recovery") {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) {
            setPageState("invalid");
            return;
          }
          window.history.replaceState(null, "", "/reset-password");
        }
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setPageState("ready");
        return;
      }

      setPageState("invalid");
    }

    establishRecoverySession();
  }, [router, searchParams]);

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        toast.error(json.error?.message ?? "Password update failed");
        return;
      }

      toast.success(json.message);
      router.push("/login?reset=success");
      router.refresh();
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  if (pageState === "loading") {
    return (
      <AuthLayout
        title="Set a new password"
        subtitle="Verifying your reset link..."
      >
        <p className="text-center text-sm text-gray-400">Please wait...</p>
      </AuthLayout>
    );
  }

  if (pageState === "invalid") {
    return (
      <AuthLayout
        title="Link expired"
        subtitle="This password reset link is invalid or has already been used."
      >
        <div className="space-y-4 text-center">
          <p className="text-sm text-gray-400">
            Request a new reset link and open it within a few minutes.
          </p>
          <Link href="/forgot-password">
            <Button className="w-full">Request new link</Button>
          </Link>
          <Link
            href="/login"
            className="block text-sm text-gray-500 hover:text-white"
          >
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password for your account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField label="New password" error={errors.password?.message}>
          <PasswordInput
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            {...register("password")}
          />
        </FormField>

        <FormField label="Confirm password" error={errors.confirmPassword?.message}>
          <PasswordInput
            placeholder="Repeat password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
        </FormField>

        <p className="text-xs text-gray-500">
          Must include uppercase, lowercase, and a number.
        </p>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update password"}
        </Button>
      </form>

      <AuthFooterLink text="Back to" linkText="Sign in" href="/login" />
    </AuthLayout>
  );
}
