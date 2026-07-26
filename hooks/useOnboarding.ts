"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { OnboardingData, OnboardingStepId } from "@/types/onboarding";
import { ONBOARDING_STEPS } from "@/data/onboarding-steps";

export const initialOnboardingData: OnboardingData = {
  name: "",
  ageRange: "",
  genderPreference: "",
  occupation: "",
  city: "",
  country: "",
  height: "",
  weight: "",
  bodyTypeKnowledge: "",
  bodyType: "",
  bodyImageUploaded: false,
  skinTone: "",
  selfieUploaded: false,
  hairColor: "",
  stylePreferences: [],
  fashionConfidence: 3,
  favoriteColors: [],
  dressUpFrequency: "",
  occasions: [],
  budget: 1,
  shoppingPlatforms: [],
  painPoints: [],
  revoFeatures: [],
  aiSelfieUploaded: false,
  aiFullBodyUploaded: false,
  aiWardrobeUploaded: false,
};

const STEP_ORDER: OnboardingStepId[] = ONBOARDING_STEPS.map((s) => s.id);

export function useOnboarding() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialOnboardingData);
  const [direction, setDirection] = useState(1);

  const currentStep = ONBOARDING_STEPS[currentStepIndex];

  const updateData = useCallback(
    <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleArrayItem = useCallback(
    <K extends keyof OnboardingData>(
      key: K,
      value: string,
      max?: number
    ) => {
      setData((prev) => {
        const current = prev[key] as string[];
        const exists = current.includes(value);
        if (exists) {
          return { ...prev, [key]: current.filter((v) => v !== value) };
        }
        if (max && current.length >= max) return prev;
        return { ...prev, [key]: [...current, value] };
      });
    },
    []
  );

  const goNext = useCallback(() => {
    if (currentStepIndex < STEP_ORDER.length - 1) {
      setDirection(1);
      setCurrentStepIndex((i) => i + 1);
    }
  }, [currentStepIndex]);

  const goBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex((i) => i - 1);
    }
  }, [currentStepIndex]);

  const goToStep = useCallback((id: OnboardingStepId) => {
    const index = STEP_ORDER.indexOf(id);
    if (index >= 0) {
      setDirection(index > currentStepIndex ? 1 : -1);
      setCurrentStepIndex(index);
    }
  }, [currentStepIndex]);

  const skipToLoading = useCallback(() => {
    setDirection(1);
    setCurrentStepIndex(STEP_ORDER.indexOf("loading"));
  }, []);

  const finishOnboarding = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  return {
    currentStep,
    currentStepIndex,
    data,
    direction,
    updateData,
    toggleArrayItem,
    goNext,
    goBack,
    goToStep,
    skipToLoading,
    finishOnboarding,
    isFirstStep: currentStepIndex === 0,
    isLastInteractiveStep: currentStep.id === "ai-boost",
    showProgress: currentStep.id !== "welcome" && currentStep.id !== "loading",
  };
}
