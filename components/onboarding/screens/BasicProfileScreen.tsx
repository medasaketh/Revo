"use client";

import { StepHeader } from "../StepHeader";
import { QuestionCard } from "../QuestionCard";
import { OptionCard } from "../OptionCard";
import { Input } from "@/components/ui/input";
import {
  AGE_RANGE_OPTIONS,
  GENDER_OPTIONS,
  OCCUPATION_OPTIONS,
} from "@/data/onboarding-steps";
import type { OnboardingData } from "@/types/onboarding";

interface BasicProfileScreenProps {
  data: OnboardingData;
  updateData: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K]
  ) => void;
}

export function BasicProfileScreen({ data, updateData }: BasicProfileScreenProps) {
  return (
    <div className="space-y-8">
      <StepHeader
        title="Let's get to know you"
        description="A few basics so your stylist can personalize everything for you."
      />

      <div className="space-y-5">
        <QuestionCard label="What's your name?">
          <Input
            placeholder="Enter your name"
            value={data.name}
            onChange={(e) => updateData("name", e.target.value)}
          />
        </QuestionCard>

        <QuestionCard label="Age range">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {AGE_RANGE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                selected={data.ageRange === opt.value}
                onClick={() => updateData("ageRange", opt.value as OnboardingData["ageRange"])}
              />
            ))}
          </div>
        </QuestionCard>

        <QuestionCard label="Gender preference">
          <div className="grid grid-cols-2 gap-3">
            {GENDER_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                selected={data.genderPreference === opt.value}
                onClick={() =>
                  updateData("genderPreference", opt.value as OnboardingData["genderPreference"])
                }
              />
            ))}
          </div>
        </QuestionCard>

        <QuestionCard label="Occupation">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {OCCUPATION_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                selected={data.occupation === opt.value}
                onClick={() =>
                  updateData("occupation", opt.value as OnboardingData["occupation"])
                }
              />
            ))}
          </div>
        </QuestionCard>
      </div>
    </div>
  );
}
