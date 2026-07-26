"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LOADING_CHECKLIST } from "@/data/onboarding-steps";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [completedItems, setCompletedItems] = useState<number>(0);

  useEffect(() => {
    const timers = LOADING_CHECKLIST.map((_, index) =>
      setTimeout(() => setCompletedItems(index + 1), (index + 1) * 1200)
    );

    const finishTimer = setTimeout(onComplete, LOADING_CHECKLIST.length * 1200 + 800);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-10 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#222222] bg-[#111111]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-8 w-8 text-[#D4C4A8]" />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 text-2xl font-semibold text-white md:text-3xl"
      >
        Building your personal fashion profile...
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12 text-gray-500"
      >
        Our AI stylist is crafting something uniquely yours
      </motion.p>

      <div className="w-full max-w-sm space-y-4">
        <AnimatePresence>
          {LOADING_CHECKLIST.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index < completedItems ? 1 : 0.3,
                x: 0,
              }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 text-left"
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs transition-all duration-500 ${
                  index < completedItems
                    ? "bg-[#D4C4A8] text-[#090909]"
                    : "border border-[#333333] bg-[#111111]"
                }`}
              >
                {index < completedItems ? "✓" : ""}
              </div>
              <span
                className={`text-sm transition-colors duration-500 ${
                  index < completedItems ? "text-white" : "text-gray-600"
                }`}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-12 h-1 w-48 overflow-hidden rounded-full bg-[#222222]"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#D4C4A8] to-white"
          animate={{ width: `${(completedItems / LOADING_CHECKLIST.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
}
