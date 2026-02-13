import { useState, useCallback } from "react";
import { toast } from "sonner";
// Ensure this path matches where you placed your provider context
import { useAppointments } from "@/Providers/appointment-provider";
import {
    BOOKING_STATUS,
    BOOKING_MESSAGES,
    BOOKING_STEPS,
    type BookingFormData,
    type BookingStatus,
    isStepValid,
    getInitialFormData
} from "@/features/components/BookingModal/BookingModal.constants";


export const useBookingForm = () => {
    const { bookAppointment } = useAppointments();

    // -- State --
    const [formData, setFormData] = useState<BookingFormData>(getInitialFormData());
    const [status, setStatus] = useState<BookingStatus>(BOOKING_STATUS.IDLE);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // -- Actions --

    // 1. Scalable field update
    const updateField = useCallback((field: keyof BookingFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // UX: Clear error state immediately when user starts typing to fix it
        if (status === BOOKING_STATUS.ERROR) setStatus(BOOKING_STATUS.IDLE);
    }, [status]);

    // 2. Reset Helper
    const resetForm = useCallback(() => {
        setFormData(getInitialFormData());
        setCurrentStepIndex(0);
        setStatus(BOOKING_STATUS.IDLE);
    }, []);

    // 3. Submit Logic (Wrapped in useCallback for performance)
    const submitForm = useCallback(async () => {
        setStatus(BOOKING_STATUS.LOADING);

        try {
            // ANEMIC PATTERN: Pass the raw form data. 
            // Let the Provider handle the API transformation (serviceType -> serviceId, etc).
            await bookAppointment(formData);

            setStatus(BOOKING_STATUS.SUCCESS);
            toast.success(BOOKING_MESSAGES.success.bookingConfirmed);

            // Auto-close/reset after success
            setTimeout(resetForm, 2000);

        } catch (err) {
            console.error(err);
            setStatus(BOOKING_STATUS.ERROR);
            // The provider throws the error so we can catch it here and show the toast
            toast.error(BOOKING_MESSAGES.error.generic);
        }
    }, [bookAppointment, formData, resetForm]);

    // 4. Navigation (Dependent on submitForm)
    const nextStep = useCallback(() => {
        // Delegate validation to the Logic file
        if (!isStepValid(currentStepIndex, formData)) {
            toast.error(BOOKING_MESSAGES.validation.incompleteForm);
            return;
        }

        if (currentStepIndex < BOOKING_STEPS.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            // Final step: Submit
            submitForm();
        }
    }, [currentStepIndex, formData, submitForm]);

    const prevStep = useCallback(() => {
        if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1);
    }, [currentStepIndex]);

    return {
        // Data
        formData,
        status,
        currentStepIndex,
        stepData: BOOKING_STEPS[currentStepIndex],

        // Derived Flags (Cheap to calculate)
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === BOOKING_STEPS.length - 1,
        isLoading: status === BOOKING_STATUS.LOADING,

        // Methods
        updateField,
        nextStep,
        prevStep,
        resetForm,
    };
};