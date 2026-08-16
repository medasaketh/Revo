"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField, AuthFooterLink } from "@/components/auth/FormField";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginInput } from "@/schemas/auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/onboarding";

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "auth_callback_failed") {
      toast.error("Sign-in link expired or invalid. Please try again.");
    }
    if (searchParams.get("reset") === "success") {
      toast.success("Password updated. Sign in with your new password.");
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!json.success) {
        toast.error(json.error?.message ?? "Sign in failed");
        return;
      }

      toast.success(json.message);
      router.push(redirectTo);
      router.refresh();
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your personal style journey."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <PasswordInput
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password")}
          />
        </FormField>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="cursor-pointer text-xs text-gray-400 hover:text-white"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <AuthFooterLink
        text="Don't have an account?"
        linkText="Create one"
        href="/register"
      />
    </AuthLayout>
  );
}
