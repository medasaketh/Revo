"use client";

import { motion } from "framer-motion";
import { Camera, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { ProfileData } from "@/types/profile";

interface ProfileHeaderProps {
  header: ProfileData["header"];
  completion: number;
  onEditProfile: () => void;
}

export function ProfileHeader({
  header,
  completion,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-[#222222] bg-[#111111] p-6 sm:p-8"
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D4C4A8]/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative shrink-0">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#D4C4A8]/30 to-[#D4C4A8]/5 text-2xl font-semibold text-[#D4C4A8] ring-2 ring-[#D4C4A8]/20 sm:h-28 sm:w-28 sm:text-3xl">
            {header.initials}
          </div>
          <button
            type="button"
            onClick={() =>
              toast.message("Photo upload coming soon", {
                description: "Connect to storage API when backend is ready.",
              })
            }
            className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-xl border border-[#222222] bg-[#111111] text-gray-400 transition-colors hover:text-white"
            aria-label="Upload photo"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-widest text-[#D4C4A8]">
            {header.displayTitle}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {header.fullName}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{header.email}</p>
          <p className="mt-1 text-xs text-gray-600">
            Member since {header.memberSince}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="text-left sm:text-right">
            <p className="text-xs text-gray-500">Profile Completion</p>
            <p className="text-2xl font-light text-white">{completion}%</p>
          </div>
          <Button variant="secondary" size="sm" onClick={onEditProfile}>
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
