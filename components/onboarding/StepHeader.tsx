"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function StepHeader({ title, description, className }: StepHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("space-y-3", className)}
    >
      <h2 className="whitespace-pre-line text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="max-w-lg text-base leading-relaxed text-gray-400 md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
