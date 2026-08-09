"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  variant?: "default" | "onboarding";
}

export default function Navbar({ variant = "default" }: NavbarProps) {
  const { user, loading, signOut } = useAuth();

  return (
    <nav className="flex w-full shrink-0 items-center justify-between bg-white px-6 py-5 shadow-sm md:px-10">
      <Link
        href="/"
        className="cursor-pointer text-2xl font-bold text-black transition-opacity hover:opacity-80"
      >
        Revo
      </Link>

      {variant === "onboarding" ? (
        <Link href="/" className="cursor-pointer">
          <button className="flex cursor-pointer items-center gap-2 rounded-full border border-black px-5 py-2 font-medium text-black transition hover:bg-black hover:text-white active:scale-[0.98]">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </Link>
      ) : (
        <div className="flex items-center gap-3">
          {!loading && user ? (
            <>
              <Link href="/dashboard" className="cursor-pointer">
                <Button variant="secondary" size="sm" className="rounded-full">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-black text-black hover:bg-black hover:text-white"
                onClick={signOut}
              >
                Logout
              </Button>
            </>
          ) : (
            !loading && (
              <>
                <Link href="/login" className="cursor-pointer">
                  <button className="cursor-pointer rounded-full border border-black px-5 py-2 font-medium text-black transition hover:bg-black hover:text-white">
                    Login
                  </button>
                </Link>
                <Link href="/register" className="cursor-pointer">
                  <button className="cursor-pointer rounded-full bg-black px-6 py-2 font-medium text-white transition hover:bg-gray-800 active:scale-[0.98]">
                    Get Started
                  </button>
                </Link>
              </>
            )
          )}
        </div>
      )}
    </nav>
  );
}
