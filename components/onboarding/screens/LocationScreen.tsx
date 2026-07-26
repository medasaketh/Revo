"use client";

import { MapPin } from "lucide-react";
import { StepHeader } from "../StepHeader";
import { QuestionCard } from "../QuestionCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { OnboardingData } from "@/types/onboarding";

interface LocationScreenProps {
  data: OnboardingData;
  updateData: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K]
  ) => void;
}

export function LocationScreen({ data, updateData }: LocationScreenProps) {
  const detectLocation = () => {
    updateData("city", "Mumbai");
    updateData("country", "India");
  };

  return (
    <div className="space-y-8">
      <StepHeader
        title="Where are you based?"
        description="Weather-aware recommendations get smarter when we know your location."
      />

      <div className="space-y-5">
        <QuestionCard
          label="City"
          description="We'll tailor outfit suggestions to your local climate."
        >
          <Input
            placeholder="e.g. Mumbai, Delhi, Bangalore"
            value={data.city}
            onChange={(e) => updateData("city", e.target.value)}
          />
        </QuestionCard>

        <QuestionCard label="Country">
          <Input
            placeholder="e.g. India"
            value={data.country}
            onChange={(e) => updateData("country", e.target.value)}
          />
        </QuestionCard>

        <Button
          variant="champagne"
          className="w-full gap-2"
          onClick={detectLocation}
        >
          <MapPin className="h-4 w-4" />
          Auto-detect location
        </Button>

        <p className="text-center text-xs text-gray-600">
          Location helps us suggest weather-appropriate outfits year-round.
        </p>
      </div>
    </div>
  );
}
