"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Upload, ImageIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadCardProps {
  title: string;
  description?: string;
  onUpload?: () => void;
  uploaded?: boolean;
  accept?: string;
  className?: string;
}

export function UploadCard({
  title,
  description,
  onUpload,
  uploaded = false,
  accept = "image/*",
  className,
}: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        onUpload?.();
      }
    },
    [onUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onUpload?.();
      }
    },
    [onUpload]
  );

  return (
    <motion.label
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      whileHover={{ borderColor: "rgba(212, 196, 168, 0.4)" }}
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 md:p-10",
        uploaded
          ? "border-[#D4C4A8]/40 bg-[#D4C4A8]/5"
          : isDragging
            ? "border-[#D4C4A8]/60 bg-[#D4C4A8]/10"
            : "border-[#222222] bg-[#111111] hover:bg-[#161616]",
        className
      )}
    >
      <input
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleFileChange}
      />

      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-2xl transition-colors",
          uploaded ? "bg-[#D4C4A8]/20 text-[#D4C4A8]" : "bg-[#222222] text-gray-400"
        )}
      >
        {uploaded ? (
          <Check className="h-6 w-6" />
        ) : isDragging ? (
          <Upload className="h-6 w-6" />
        ) : (
          <ImageIcon className="h-6 w-6" />
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-white">{title}</p>
        {description && (
          <p className="text-xs leading-relaxed text-gray-500">{description}</p>
        )}
      </div>

      {!uploaded && (
        <p className="text-xs text-gray-600">
          Drag & drop or click to browse
        </p>
      )}

      {uploaded && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xs font-medium text-[#D4C4A8]"
        >
          Photo added ✓
        </motion.span>
      )}
    </motion.label>
  );
}
