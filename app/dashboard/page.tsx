"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D4C4A8]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-[#222222] bg-[#111111]">
          <Sparkles className="h-7 w-7 text-[#D4C4A8]" />
        </div>

        <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Welcome to your dashboard
        </h1>
        <p className="mb-10 max-w-md text-gray-400">
          Your fashion profile is ready. AI-powered recommendations, outfit
          ratings, and your digital wardrobe will live here.
        </p>

        <div className="grid w-full max-w-lg gap-4 sm:grid-cols-3">
          {["Style Profile", "AI Stylist", "Wardrobe"].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#222222] bg-[#111111] p-6 text-sm text-gray-400"
            >
              <p className="font-medium text-white">{item}</p>
              <p className="mt-1 text-xs">Coming soon</p>
            </div>
          ))}
        </div>

        <Link href="/" className="mt-12">
          <Button variant="secondary" className="gap-2">
            Back to Home
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
