import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useBookingForm } from "@/shared/lib/utils/hooks/useBookingForm";
import { StepIndicator } from "./StepIndicator";
import { BookingModalStyles as s } from "./BookingModal.styles";
import { BOOKING_STEPS } from "./BookingModal.constants";
import { BookingModalWrapper } from "./BookingModalWrapper";
import {
  YourInfoStep,
  ScheduleStep,
  ConfirmationStep
} from "./steps";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const {
    currentStepIndex,
    stepData,
    isLoading,
    nextStep,
    prevStep,
    formData,
    updateField
  } = useBookingForm();

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === BOOKING_STEPS.length - 1;

  // Map step index to component
  const renderStepContent = () => {
    switch (currentStepIndex) {
      case 0:
        return <YourInfoStep formData={formData} updateField={updateField} />;
      case 1:
        return <ScheduleStep formData={formData} updateField={updateField} />;
      case 2:
        return <ConfirmationStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <BookingModalWrapper isOpen={isOpen} onClose={onClose}>
          <div className={s.container}>
            {/* Step Indicator */}
            <StepIndicator currentStep={currentStepIndex} steps={BOOKING_STEPS} />

            {/* Header */}
            <div className={s.header.wrapper}>
              <h2 id="booking-modal-title" className={s.header.title}>{stepData.title}</h2>
              <p className={s.header.description}>{stepData.description}</p>
            </div>

            {/* Form Content with Animation */}
            <div className="flex-1 min-h-[220px] sm:min-h-[280px] md:min-h-[320px] py-4 sm:py-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className={s.navigation.container}>
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={prevStep}
                  className={`${s.navigation.buttonBase} ${s.navigation.backButton}`}
                  aria-label="Go to previous step"
                >
                  <ArrowLeft className={s.navigation.icon} />
                  <span>Back</span>
                </button>
              )}

              <button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className={`${s.navigation.buttonBase} ${s.navigation.continueButton}`}
                aria-label={isLastStep ? "Confirm booking" : "Continue to next step"}
              >
                {isLoading ? (
                  <>
                    <Loader2 className={`${s.navigation.icon} animate-spin`} />
                    <span>Processing...</span>
                  </>
                ) : isLastStep ? (
                  <>
                    <span>Confirm Booking</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className={s.navigation.icon} />
                  </>
                )}
              </button>
            </div>
          </div>
        </BookingModalWrapper>
      )}
    </AnimatePresence>
  );
};