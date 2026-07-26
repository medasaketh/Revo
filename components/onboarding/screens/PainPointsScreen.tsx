"use client";

import { StepHeader } from "../StepHeader";
import { QuestionCard } from "../QuestionCard";
import { MultiSelectCard } from "../MultiSelectCard";
import { PAIN_POINT_OPTIONS, REVO_FEATURE_OPTIONS } from "@/data/onboarding-steps";
import type { OnboardingData, PainPoint, RevoFeature } from "@/types/onboarding";

interface PainPointsScreenProps {
  data: OnboardingData;
  toggleArrayItem: <K extends keyof OnboardingData>(
    key: K,
    value: string
  ) => void;
}

export function PainPointsScreen({ data, toggleArrayItem }: PainPointsScreenProps) {
  return (
    <div className="space-y-8">
      <StepHeader
        title="What holds you back?"
        description="We'll focus on solving the frustrations that matter most to you."
      />

      <div className="space-y-5">
        <QuestionCard label="What frustrates you most?">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PAIN_POINT_OPTIONS.map((opt) => (
              <MultiSelectCard
                key={opt.value}
                label={opt.label}
                selected={data.painPoints.includes(opt.value as PainPoint)}
                onClick={() => toggleArrayItem("painPoints", opt.value)}
              />
            ))}
          </div>
        </QuestionCard>

        <QuestionCard label="What would you like Revo to help you with?">
          <div className="grid gap-3 sm:grid-cols-2">
            {REVO_FEATURE_OPTIONS.map((opt) => (
              <MultiSelectCard
                key={opt.value}
                label={opt.label}
                description={opt.description}
                selected={data.revoFeatures.includes(opt.value as RevoFeature)}
                onClick={() => toggleArrayItem("revoFeatures", opt.value)}
              />
            ))}
          </div>
        </QuestionCard>
      </div>
    </div>
  );
}
