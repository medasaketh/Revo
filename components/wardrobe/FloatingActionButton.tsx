"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, FolderPlus, Plus, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onAddItem: () => void;
}

export function FloatingActionButton({ onAddItem }: FloatingActionButtonProps) {
  const [open, setOpen] = useState(false);

  const actions = [
    { id: "add", label: "Add Clothing", icon: Plus, onClick: onAddItem },
    {
      id: "collection",
      label: "Create Collection",
      icon: FolderPlus,
      onClick: () => toast.message("Collections coming soon"),
    },
    {
      id: "upload",
      label: "Upload Multiple",
      icon: Upload,
      onClick: () => toast.message("Bulk upload coming soon"),
    },
    {
      id: "scan",
      label: "Scan Label",
      icon: Camera,
      onClick: () => toast.message("Scan label coming soon"),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 space-y-2"
          >
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-2xl border border-[#202020] bg-[#111111] px-4 py-3 text-sm text-white shadow-xl"
              >
                <action.icon className="h-4 w-4 text-[#D4C4A8]" />
                {action.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#090909] shadow-2xl transition-transform",
          open && "rotate-45"
        )}
        aria-label="Quick actions"
      >
        {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
