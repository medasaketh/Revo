"use client";

import { Camera, User, Shirt } from "lucide-react";
import { StepHeader } from "../StepHeader";
import { UploadCard } from "../UploadCard";
import type { OnboardingData } from "@/types/onboarding";

interface AiBoostScreenProps {
  data: OnboardingData;
  updateData: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K]
  ) => void;
}

const UPLOAD_ITEMS = [
  {
    key: "aiSelfieUploaded" as const,
    icon: Camera,
    title: "Upload Selfie",
    description:
      "Helps us analyze skin tone and facial features for precise color matching.",
  },
  {
    key: "aiFullBodyUploaded" as const,
    icon: User,
    title: "Upload Full Body Photo",
    description:
      "Enables accurate body type detection and personalized fit recommendations.",
  },
  {
    key: "aiWardrobeUploaded" as const,
    icon: Shirt,
    title: "Upload Wardrobe Photos",
    description:
      "Build your digital closet and discover new outfit combinations instantly.",
  },
];

export function AiBoostScreen({ data, updateData }: AiBoostScreenProps) {
  return (
    <div className="space-y-8">
      <StepHeader
        title="Make your recommendations even smarter."
        description="Optional uploads help our AI understand you on a deeper level. All photos stay private."
      />

      <div className="grid gap-4 md:grid-cols-1">
        {UPLOAD_ITEMS.map((item) => (
          <div key={item.key} className="relative">
            <div className="absolute left-5 top-5 z-10 text-[#D4C4A8]">
              <item.icon className="h-5 w-5" />
            </div>
            <UploadCard
              title={item.title}
              description={item.description}
              uploaded={data[item.key]}
              onUpload={() => updateData(item.key, true)}
              className="pl-14"
            />
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-600">
        All uploads are optional. You can add these later from your profile.
      </p>
    </div>
  );
}
