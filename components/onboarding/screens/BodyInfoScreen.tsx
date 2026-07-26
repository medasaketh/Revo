"use client";

import { motion, AnimatePresence } from "framer-motion";
import { StepHeader } from "../StepHeader";
import { QuestionCard } from "../QuestionCard";
import { OptionCard } from "../OptionCard";
import { UploadCard } from "../UploadCard";
import { Input } from "@/components/ui/input";
import {
  BODY_TYPE_KNOWLEDGE_OPTIONS,
  BODY_TYPE_OPTIONS,
} from "@/data/onboarding-steps";
import type { OnboardingData } from "@/types/onboarding";

interface BodyInfoScreenProps {
  data: OnboardingData;
  updateData: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K]
  ) => void;
}

export function BodyInfoScreen({ data, updateData }: BodyInfoScreenProps) {
  return (
    <div className="space-y-8">
      <StepHeader
        title="Your body, your fit"
        description="Great style starts with understanding proportions and fit."
      />

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <QuestionCard label="Height">
            <Input
              placeholder="e.g. 5'8&quot; or 173 cm"
              value={data.height}
              onChange={(e) => updateData("height", e.target.value)}
            />
          </QuestionCard>
          <QuestionCard label="Weight (optional)">
            <Input
              placeholder="e.g. 65 kg"
              value={data.weight}
              onChange={(e) => updateData("weight", e.target.value)}
            />
          </QuestionCard>
        </div>

        <QuestionCard label="Do you already know your body type?">
          <div className="grid gap-3 sm:grid-cols-2">
            {BODY_TYPE_KNOWLEDGE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                description={opt.description}
                selected={data.bodyTypeKnowledge === opt.value}
                onClick={() =>
                  updateData(
                    "bodyTypeKnowledge",
                    opt.value as OnboardingData["bodyTypeKnowledge"]
                  )
                }
              />
            ))}
          </div>
        </QuestionCard>

        <AnimatePresence mode="wait">
          {data.bodyTypeKnowledge === "yes" && (
            <motion.div
              key="body-types"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <QuestionCard label="Select your body type">
                <div className="grid gap-3 sm:grid-cols-2">
                  {BODY_TYPE_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      description={opt.description}
                      selected={data.bodyType === opt.value}
                      onClick={() =>
                        updateData("bodyType", opt.value as OnboardingData["bodyType"])
                      }
                    />
                  ))}
                </div>
              </QuestionCard>
            </motion.div>
          )}

          {data.bodyTypeKnowledge === "help-me" && (
            <motion.div
              key="body-upload"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <UploadCard
                title="Upload a full-body image"
                description="Stand straight, wear fitted clothing. Our AI will help identify your body type."
                uploaded={data.bodyImageUploaded}
                onUpload={() => updateData("bodyImageUploaded", true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
