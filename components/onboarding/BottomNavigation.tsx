"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  showBack?: boolean;
  showSkip?: boolean;
  nextDisabled?: boolean;
  className?: string;
}

export function BottomNavigation({
  onBack,
  onNext,
  onSkip,
  nextLabel = "Continue",
  showBack = true,
  showSkip = false,
  nextDisabled = false,
  className,
}: BottomNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={cn(
        "flex items-center justify-between gap-4 border-t border-[#222222]/50 pt-6",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {showBack && onBack && (
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        {showSkip && onSkip && (
          <Button variant="ghost" size="sm" onClick={onSkip}>
            Skip
          </Button>
        )}
      </div>

      {onNext && (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onNext}
            disabled={nextDisabled}
            className="gap-2 min-w-[140px]"
          >
            {nextLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
