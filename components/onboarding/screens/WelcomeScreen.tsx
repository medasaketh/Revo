"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { StepHeader } from "../StepHeader";
import { AnimatedButton } from "../AnimatedButton";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
  onSkip: () => void;
}

export function WelcomeScreen({ onStart, onSkip }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 flex items-center gap-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#222222] bg-[#111111]">
          <Sparkles className="h-5 w-5 text-[#D4C4A8]" />
        </div>
        <span className="text-2xl font-semibold tracking-tight text-white">
          Revo
        </span>
      </motion.div>

      <StepHeader
        title={"Stop Guessing.\nStart Knowing."}
        description="We'll understand your style and build your personal fashion profile in under 2 minutes."
        className="mx-auto max-w-xl text-center [&_h2]:text-4xl [&_h2]:md:text-5xl [&_h2]:lg:text-6xl [&_p]:mx-auto"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
      >
        <AnimatedButton size="lg" onClick={onStart} className="min-w-[200px]">
          Get Started
        </AnimatedButton>
        <Button variant="ghost" size="lg" onClick={onSkip}>
          Skip
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-16 text-xs tracking-widest text-gray-600 uppercase"
      >
        Powered by AI · Personal · Private
      </motion.p>
    </div>
  );
}
