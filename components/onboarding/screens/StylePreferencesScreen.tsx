"use client";

import { StepHeader } from "../StepHeader";
import { QuestionCard } from "../QuestionCard";
import { ColorChip } from "../ColorChip";
import { Slider } from "@/components/ui/slider";
import {
  STYLE_OPTIONS,
  FAVORITE_COLOR_OPTIONS,
  FASHION_CONFIDENCE_LABELS,
} from "@/data/onboarding-steps";
import type { OnboardingData, FavoriteColor, StylePreference } from "@/types/onboarding";
import { cn } from "@/lib/utils";

interface StylePreferencesScreenProps {
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

export function StylePreferencesScreen({
  data,
  updateData,
  toggleArrayItem,
}: StylePreferencesScreenProps) {
  return (
    <div className="space-y-8">
      <StepHeader
        title="What's your vibe?"
        description="Select the styles that resonate with you — pick as many as you like."
      />

      <div className="space-y-5">
        <QuestionCard label="Style preferences" description="Multi-select">
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map((opt) => {
              const selected = data.stylePreferences.includes(
                opt.value as StylePreference
              );
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleArrayItem("stylePreferences", opt.value)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-all duration-300",
                    selected
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-[#222222] bg-[#0d0d0d] text-gray-400 hover:border-[#333333] hover:text-white"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </QuestionCard>

        <QuestionCard
          label="Fashion confidence"
          description={`${FASHION_CONFIDENCE_LABELS[data.fashionConfidence - 1]} · ${data.fashionConfidence} of 5`}
        >
          <div className="space-y-4 px-1">
            <Slider
              min={1}
              max={5}
              step={1}
              value={[data.fashionConfidence]}
              onValueChange={([val]) => updateData("fashionConfidence", val)}
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        </QuestionCard>

        <QuestionCard label="Favorite colors">
          <div className="flex flex-wrap gap-2">
            {FAVORITE_COLOR_OPTIONS.map((opt) => (
              <ColorChip
                key={opt.value}
                label={opt.label}
                value={opt.value}
                selected={data.favoriteColors.includes(opt.value as FavoriteColor)}
                onClick={() => toggleArrayItem("favoriteColors", opt.value)}
              />
            ))}
          </div>
        </QuestionCard>
      </div>
    </div>
  );
}
