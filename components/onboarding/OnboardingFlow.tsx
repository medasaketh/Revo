"use client";

import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <div className="relative min-h-screen bg-[#090909]">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#D4C4A8]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[100px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-8 md:px-8 md:py-12">
        {/* Top bar */}
        {!isWelcome && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 space-y-4"
          >
            <span className="text-sm font-semibold tracking-tight text-white">
              Revo
            </span>
            {showProgress && currentStep.stepNumber && (
              <ProgressBar step={currentStep.stepNumber} />
            )}
          </motion.div>
        )}

        {/* Screen content */}
        <div className="flex flex-1 flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        {!isWelcome && !isLoading && (
          <BottomNavigation
            onBack={goBack}
            onNext={goNext}
            onSkip={isLastInteractiveStep ? skipToLoading : undefined}
            showBack={!isFirstStep}
            showSkip={isLastInteractiveStep}
            nextLabel={isLastInteractiveStep ? "Finish" : "Continue"}
          />
        )}
      </div>
    </div>
  );
}
