"use client";

import { motion, AnimatePresence } from "framer-motion";
import { StepHeader } from "../StepHeader";
import { QuestionCard } from "../QuestionCard";
import { OptionCard } from "../OptionCard";
import { UploadCard } from "../UploadCard";
import { SKIN_TONE_OPTIONS, HAIR_COLOR_OPTIONS } from "@/data/onboarding-steps";
import type { OnboardingData } from "@/types/onboarding";

interface AppearanceScreenProps {
  data: OnboardingData;
  updateData: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K]
  ) => void;
}

export function AppearanceScreen({ data, updateData }: AppearanceScreenProps) {
  return (
    <div className="space-y-8">
      <StepHeader
        title="Your natural palette"
        description="Skin tone and hair color help us recommend colors that truly flatter you."
      />

      <div className="space-y-5">
        <QuestionCard label="Do you know your skin tone?">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SKIN_TONE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                selected={data.skinTone === opt.value}
                onClick={() =>
                  updateData("skinTone", opt.value as OnboardingData["skinTone"])
                }
              />
            ))}
          </div>
        </QuestionCard>

        <AnimatePresence>
          {data.skinTone === "not-sure" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <UploadCard
                title="Upload a selfie"
                description="Natural lighting works best. We'll analyze your skin undertone automatically."
                uploaded={data.selfieUploaded}
                onUpload={() => updateData("selfieUploaded", true)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <QuestionCard label="Hair color">
          <div className="flex flex-wrap gap-3">
            {HAIR_COLOR_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                selected={data.hairColor === opt.value}
                onClick={() =>
                  updateData("hairColor", opt.value as OnboardingData["hairColor"])
                }
                className="!w-auto min-w-[100px] flex-1"
              />
            ))}
          </div>
        </QuestionCard>
      </div>
    </div>
  );
}
