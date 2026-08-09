"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Nav";
import { useAuth } from "@/components/providers/AuthProvider";
import { useOnboarding } from "@/hooks/useOnboarding";
import { ProgressBar } from "./ProgressBar";
import { BottomNavigation } from "./BottomNavigation";
import { LoadingScreen } from "./LoadingScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { BasicProfileScreen } from "./screens/BasicProfileScreen";
import { LocationScreen } from "./screens/LocationScreen";
import { BodyInfoScreen } from "./screens/BodyInfoScreen";
import { AppearanceScreen } from "./screens/AppearanceScreen";
import { StylePreferencesScreen } from "./screens/StylePreferencesScreen";
import { LifestyleScreen } from "./screens/LifestyleScreen";
import { ShoppingScreen } from "./screens/ShoppingScreen";
import { PainPointsScreen } from "./screens/PainPointsScreen";
import { AiBoostScreen } from "./screens/AiBoostScreen";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export function OnboardingFlow() {
  const {
    currentStep,
    data,
    direction,
    updateData,
    toggleArrayItem,
    goNext,
    goBack,
    skipToLoading,
    finishOnboarding,
    isFirstStep,
    isLastInteractiveStep,
    showProgress,
  } = useOnboarding();

  const { profile, user } = useAuth();

  const questionScrollRef = useRef<HTMLDivElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nameFromProfile =
      profile?.full_name || user?.user_metadata?.full_name || "";
    if (nameFromProfile && !data.name) {
      updateData("name", nameFromProfile);
    }
  }, [profile?.full_name, user, data.name, updateData]);

  useEffect(() => {
    questionScrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
    contentScrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [currentStep.id]);

  const renderScreen = () => {
    switch (currentStep.id) {
      case "welcome":
        return (
          <WelcomeScreen
            onStart={goNext}
            onSkip={() => skipToLoading()}
          />
        );
      case "basic-profile":
        return <BasicProfileScreen data={data} updateData={updateData} />;
      case "location":
        return <LocationScreen data={data} updateData={updateData} />;
      case "body-info":
        return <BodyInfoScreen data={data} updateData={updateData} />;
      case "appearance":
        return <AppearanceScreen data={data} updateData={updateData} />;
      case "style-preferences":
        return (
          <StylePreferencesScreen
            data={data}
            updateData={updateData}
            toggleArrayItem={toggleArrayItem}
          />
        );
      case "lifestyle":
        return (
          <LifestyleScreen
            data={data}
            updateData={updateData}
            toggleArrayItem={toggleArrayItem}
          />
        );
      case "shopping":
        return (
          <ShoppingScreen
            data={data}
            updateData={updateData}
            toggleArrayItem={toggleArrayItem}
          />
        );
      case "pain-points":
        return (
          <PainPointsScreen data={data} toggleArrayItem={toggleArrayItem} />
        );
      case "ai-boost":
        return <AiBoostScreen data={data} updateData={updateData} />;
      case "loading":
        return <LoadingScreen onComplete={finishOnboarding} />;
      default:
        return null;
    }
  };

  const isWelcome = currentStep.id === "welcome";
  const isLoading = currentStep.id === "loading";
  const isQuestionStep = !isWelcome && !isLoading;

  return (
    <div className="relative flex h-dvh flex-col bg-[#090909]">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D4C4A8]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[100px]" />
      </div>

      {/* Fixed top: navbar + progress */}
      <header className="relative z-10 shrink-0">
        <Navbar variant="onboarding" />

        {showProgress && currentStep.stepNumber && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-[#222222] bg-[#090909]/95 px-5 py-4 backdrop-blur-sm md:px-8"
          >
            <div className="mx-auto max-w-3xl">
              <ProgressBar step={currentStep.stepNumber} />
            </div>
          </motion.div>
        )}
      </header>

      {/* Main content area */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        {isQuestionStep ? (
          <>
            {/* Scrollable questions only */}
            <div
              ref={questionScrollRef}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
              <div className="mx-auto max-w-3xl px-5 py-6 md:px-8 md:py-8">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {renderScreen()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Fixed bottom navigation */}
            <footer className="shrink-0 border-t border-[#222222] bg-[#090909]/95 px-5 py-4 backdrop-blur-sm md:px-8">
              <div className="mx-auto max-w-3xl">
                <BottomNavigation
                  onBack={goBack}
                  onNext={goNext}
                  onSkip={isLastInteractiveStep ? skipToLoading : undefined}
                  showBack={!isFirstStep}
                  showSkip={isLastInteractiveStep}
                  nextLabel={isLastInteractiveStep ? "Finish" : "Continue"}
                  className="border-t-0 pt-0"
                />
              </div>
            </footer>
          </>
        ) : (
          /* Welcome & loading — centered, scroll if needed */
          <div
            ref={contentScrollRef}
            className="min-h-0 flex-1 overflow-y-auto"
          >
            <div className="mx-auto flex min-h-full max-w-3xl flex-col px-5 py-8 md:px-8 md:py-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-1 flex-col"
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
