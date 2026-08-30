"use client";

import Link from "next/link";
import { Bell, Menu, User } from "lucide-react";
import { useDashboardLayout } from "@/components/dashboard/DashboardShell";
import { useLiveDateTime } from "@/hooks/useLiveDateTime";
import type { DashboardData } from "@/types/dashboard";

interface TopBarProps {
  user: DashboardData["user"];
  greeting: DashboardData["greeting"];
}

export function TopBar({ user, greeting }: TopBarProps) {
  const { openMobileMenu } = useDashboardLayout();
  const { greeting: greetingLabel, dateLabel, timeLabel, timeZoneLabel, isReady } =
    useLiveDateTime();

  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={openMobileMenu}
          className="mt-1 rounded-xl p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {greetingLabel}, {user.name}{" "}
            <span className="inline-block animate-[wave_2s_ease-in-out_infinite]">
              👋
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            {greeting.subtitle}
          </p>
          <p className="mt-2 text-xs text-gray-600 md:hidden">
            {isReady ? (
              <>
                {dateLabel} · {timeLabel} ({timeZoneLabel})
              </>
            ) : (
              <span className="inline-block h-3 w-40 animate-pulse rounded bg-[#1f1f1f]" />
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-start">
        <div className="hidden text-right md:block">
          {isReady ? (
            <>
              <p className="text-sm text-white">{dateLabel}</p>
              <p className="text-xs text-gray-500">
                {timeLabel} · {timeZoneLabel}
              </p>
            </>
          ) : (
            <div className="space-y-1.5">
              <div className="ml-auto h-4 w-36 animate-pulse rounded bg-[#1f1f1f]" />
              <div className="ml-auto h-3 w-28 animate-pulse rounded bg-[#1f1f1f]" />
            </div>
          )}
        </div>
        <button
          type="button"
          className="relative rounded-xl border border-[#1f1f1f] bg-[#111111] p-2.5 text-gray-400 transition-colors hover:border-[#333] hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D4C4A8]" />
        </button>
        <Link
          href="/profile"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1f1f1f] bg-[#111111] text-gray-400 transition-colors hover:border-[#333] hover:text-white"
          aria-label="Profile"
        >
          <User className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
