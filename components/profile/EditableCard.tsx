"use client";

import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProfileField } from "@/types/profile";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onEdit?: () => void;
  editLabel?: string;
}

export function SectionHeader({
  title,
  subtitle,
  onEdit,
  editLabel = "Edit",
}: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
      {onEdit && (
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-3.5 w-3.5" />
          {editLabel}
        </Button>
      )}
    </div>
  );
}

interface EditableCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  fields?: ProfileField[];
  onEdit?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function EditableCard({
  id,
  title,
  subtitle,
  fields,
  onEdit,
  children,
  className,
}: EditableCardProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={cn(
        "scroll-mt-28 rounded-3xl border border-[#222222] bg-[#111111] p-6",
        className
      )}
    >
      <SectionHeader title={title} subtitle={subtitle} onEdit={onEdit} />

      {fields && (
        <dl className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.label}
              className="rounded-2xl border border-[#222222]/60 bg-[#0a0a0a] px-4 py-3"
            >
              <dt className="text-xs text-gray-500">{field.label}</dt>
              <dd className="mt-1 text-sm font-medium text-white">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {children}
    </motion.section>
  );
}

export { SectionHeader as ProfileSectionHeader };
