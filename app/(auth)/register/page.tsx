"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField, AuthFooterLink } from "@/components/auth/FormField";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema, type RegisterInput } from "@/schemas/auth";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!json.success) {
        toast.error(json.error?.message ?? "Registration failed");
        return;
      }

      toast.success(json.message);

      if (json.data?.requiresEmailConfirmation) {
        toast.info("Check your email to verify your account, then sign in.");
        router.push("/login");
      } else if (json.data?.session) {
        if (json.data?.profileSetupPending) {
          toast.info("Continue onboarding — profile sync will complete after database setup.");
        }
        router.push("/onboarding");
      } else {
        router.push("/login");
      }

      router.refresh();
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Revo and stop guessing what suits you."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField label="Full name" error={errors.fullName?.message}>
          <Input
            placeholder="Jane Doe"
            autoComplete="name"
            {...register("fullName")}
          />
        </FormField>

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
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <AuthFooterLink
        text="Already have an account?"
        linkText="Sign in"
        href="/login"
      />
    </AuthLayout>
  );
}
