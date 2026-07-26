"use client";

import { StepHeader } from "../StepHeader";
import { QuestionCard } from "../QuestionCard";
import { OptionCard } from "../OptionCard";
import { DRESS_UP_OPTIONS, OCCASION_OPTIONS } from "@/data/onboarding-steps";
import type { OnboardingData, DressUpFrequency, Occasion } from "@/types/onboarding";
import { cn } from "@/lib/utils";

interface LifestyleScreenProps {
  data: OnboardingData;
  updateData: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K]
  ) => void;
  toggleArrayItem: <K extends keyof OnboardingData>(
    key: K,
    value: string
  ) => void;
}

export function LifestyleScreen({
  data,
  updateData,
  toggleArrayItem,
}: LifestyleScreenProps) {
  return (
    <div className="space-y-8">
      <StepHeader
        title="Your everyday life"
        description="Tell us how you dress so recommendations match your real routine."
      />

      <div className="space-y-5">
        <QuestionCard label="How often do you dress up?">
          <div className="grid grid-cols-2 gap-3">
            {DRESS_UP_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                selected={data.dressUpFrequency === opt.value}
                onClick={() =>
                  updateData(
                    "dressUpFrequency",
                    opt.value as DressUpFrequency
                  )
                }
              />
            ))}
          </div>
        </QuestionCard>

        <QuestionCard label="Typical occasions" description="Select all that apply">
          <div className="flex flex-wrap gap-2">
            {OCCASION_OPTIONS.map((opt) => {
              const selected = data.occasions.includes(opt.value as Occasion);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleArrayItem("occasions", opt.value)}
                  className={cn(
                    "rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
                    selected
                      ? "border-[#D4C4A8]/50 bg-[#D4C4A8]/10 text-[#D4C4A8]"
                      : "border-[#222222] bg-[#111111] text-gray-400 hover:border-[#333333]"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </QuestionCard>
      </div>
    </div>
  );
}
