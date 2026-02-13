import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { BookingStep } from "@/shared/lib/utils/constants";
import { BookingModalStyles as s } from "./BookingModal.styles"; // Optional: if you want to reuse colors

interface StepIndicatorProps {
  currentStep: number; // Expecting 0-based index (0, 1, 2...)
  steps: readonly BookingStep[];
}

export const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  // Calculate width for the connecting line
  // Example: Step 2 (index 1) of 5 steps = (1 / 4) * 100 = 25%
  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="relative w-full mb-8 px-2">
      {/* 1. The Background Track (Gray Line) */}
      <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 rounded-full -z-10" />

      {/* 2. The Active Progress Track (Colored Line) */}
      <motion.div
        className="absolute top-4 left-0 h-1 bg-black rounded-full -z-10"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* 3. The Steps (Circles) */}
      <div className="flex justify-between items-start w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div key={index} className="flex flex-col items-center relative group">
              {/* Circle Bubble */}
              <motion.div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 
                  transition-colors duration-200 z-10
                  ${isActive || isCompleted 
                    ? "bg-black border-black text-white" 
                    : "bg-white border-gray-200 text-gray-400"
                  }
                `}
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isActive || isCompleted ? "#000000" : "#ffffff",
                  borderColor: isActive || isCompleted ? "#000000" : "#e5e7eb",
                }}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>

              {/* Step Title (Optional: Hidden on very small screens if needed) */}
              <div className="absolute top-10 w-32 text-center">
                <span 
                  className={`
                    text-[10px] uppercase tracking-wider font-semibold transition-colors duration-300
                    ${isActive ? "text-black" : "text-gray-400"}
                  `}
                >
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