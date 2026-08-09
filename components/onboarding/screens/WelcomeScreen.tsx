"use client";

import { motion } from "framer-motion";
import { StepHeader } from "../StepHeader";
import { AnimatedButton } from "../AnimatedButton";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
  onSkip: () => void;
}

export function WelcomeScreen({ onStart, onSkip }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <StepHeader
        title={"Stop Guessing.\nStart Knowing."}
        description="We'll understand your style and build your personal fashion profile in under 2 minutes."
        className="mx-auto max-w-xl text-center [&_h2]:text-4xl [&_h2]:md:text-5xl [&_h2]:lg:text-6xl [&_p]:mx-auto"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
      >
        <AnimatedButton
          size="lg"
          onClick={onStart}
          className="min-w-[200px] cursor-pointer"
        >
          Get Started
        </AnimatedButton>
        <Button
          variant="ghost"
          size="lg"
          onClick={onSkip}
          className="cursor-pointer"
        >
          Skip
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-xs tracking-widest text-gray-600 uppercase"
      >
        Powered by AI · Personal · Private
      </motion.p>
    </div>
  );
}
