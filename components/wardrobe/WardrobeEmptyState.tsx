"use client";

import { motion } from "framer-motion";
import { Plus, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WardrobeEmptyStateProps {
  onAddItem: () => void;
}

export function WardrobeEmptyState({ onAddItem }: WardrobeEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-dashed border-[#202020] bg-[#111111] px-6 py-20 text-center"
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#D4C4A8]/20 to-transparent ring-1 ring-[#D4C4A8]/20">
        <Shirt className="h-9 w-9 text-[#D4C4A8]" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-white">
        Your wardrobe starts here.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">
        Add your first clothing item and let Revo build personalized
        recommendations around what you actually own.
      </p>
      <Button className="mt-8" onClick={onAddItem}>
        <Plus className="h-4 w-4" />
        Add First Item
      </Button>
    </motion.div>
  );
}
