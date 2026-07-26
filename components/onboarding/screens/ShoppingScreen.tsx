"use client";

import { StepHeader } from "../StepHeader";
import { QuestionCard } from "../QuestionCard";
import { Slider } from "@/components/ui/slider";
import { BUDGET_LABELS, SHOPPING_PLATFORM_OPTIONS } from "@/data/onboarding-steps";
import type { OnboardingData, ShoppingPlatform } from "@/types/onboarding";
import { cn } from "@/lib/utils";

interface ShoppingScreenProps {
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

export function ShoppingScreen({
  data,
  updateData,
  toggleArrayItem,
}: ShoppingScreenProps) {
  return (
    <div className="space-y-8">
      <StepHeader
        title="How you shop"
        description="Budget and favorite stores help us suggest pieces you'll actually buy."
      />

      <div className="space-y-5">
        <QuestionCard
          label="Budget per item"
          description={BUDGET_LABELS[data.budget]}
        >
          <div className="space-y-4 px-1">
            <Slider
              min={0}
              max={3}
              step={1}
              value={[data.budget]}
              onValueChange={([val]) => updateData("budget", val)}
            />
            <div className="grid grid-cols-4 gap-1 text-center text-[10px] text-gray-600 sm:text-xs">
              {BUDGET_LABELS.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </QuestionCard>

        <QuestionCard label="Where do you shop?" description="Select all that apply">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SHOPPING_PLATFORM_OPTIONS.map((opt) => {
              const selected = data.shoppingPlatforms.includes(
                opt.value as ShoppingPlatform
              );
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleArrayItem("shoppingPlatforms", opt.value)}
                  className={cn(
                    "rounded-2xl border p-4 text-sm font-medium transition-all duration-300",
                    selected
                      ? "border-white/40 bg-white/5 text-white"
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
