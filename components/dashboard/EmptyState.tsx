"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}

export function EmptyState({
  title,
  description,
  buttonLabel,
  href,
}: EmptyStateProps) {
  return (
    <DashboardCard className="py-12 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#D4C4A8]/20 to-transparent ring-1 ring-[#D4C4A8]/20"
      >
        <Shirt className="h-9 w-9 text-[#D4C4A8]" />
      </motion.div>
      <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">{description}</p>
      <Link href={href} className="mt-8 inline-block">
        <Button>{buttonLabel}</Button>
      </Link>
    </DashboardCard>
  );
}
