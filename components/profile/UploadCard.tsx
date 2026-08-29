"use client";

import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { UploadStatus } from "@/types/profile";

interface UploadCardProps {
  upload: UploadStatus;
}

export function UploadCard({ upload }: UploadCardProps) {
  if (upload.available) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-5 flex flex-col gap-4 rounded-2xl border border-dashed border-[#D4C4A8]/30 bg-[#D4C4A8]/5 p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="text-sm font-medium text-[#D4C4A8]">{upload.label}</p>
        <p className="mt-1 text-xs leading-relaxed text-gray-400">
          {upload.description}
        </p>
      </div>
      <Button
        variant="champagne"
        size="sm"
        className="shrink-0"
        onClick={() =>
          toast.message("Upload coming soon", {
            description: upload.buttonLabel,
          })
        }
      >
        <Upload className="h-4 w-4" />
        {upload.buttonLabel}
      </Button>
    </motion.div>
  );
}
