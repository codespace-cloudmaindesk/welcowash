import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { BookingStep } from "@/shared/lib/utils/constants";
import { StepIndicatorStyles as s } from "./BookingModal.styles";
import { cn } from "@/shared/lib/utils/utils";

interface StepIndicatorProps {
  currentStep: number; // 0-based index (0, 1, 2...)
  steps: readonly BookingStep[];
}

export const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  // Calculate progress percentage for the animated line
  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className={s.container}>
      {/* Background Track */}
      <div className={s.track.background} />

      {/* Active Progress Track */}
      <motion.div
        className={s.track.active}
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Step Circles and Labels */}
      <div className={s.stepsWrapper}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className={s.stepItem}>
              {/* Circle with Animation */}
              <motion.div
                className={cn(
                  s.circle.base,
                  isActive || isCompleted ? s.circle.active : s.circle.pending
                )}
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isActive || isCompleted ? "#000000" : "#ffffff",
                  borderColor: isActive || isCompleted ? "#000000" : "#e5e7eb",
                }}
              >
                {isCompleted ? (
                  <Check className={s.checkIcon} strokeWidth={3} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>

              {/* Step Label */}
              <div className={s.labelWrapper}>
                <span className={cn(s.label.base, isActive ? s.label.active : s.label.inactive)}>
                  {step.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};