import { BookingStep } from "@/shared/lib/utils/constants";

export const BOOKING_STEPS: readonly BookingStep[] = [
  { title: "Your Info", description: "Tell us who you are so we can reach you.", },
  { title: "Schedule", description: "When and where would you like us to wash your vehicle?", },
  { title: "Confirm", description: "Review your booking details and confirm.", },
] as const;

export const BOOKING_MESSAGES = {
  validation: { incompleteForm: "Please complete the highlighted fields to continue.", },
  success: { bookingConfirmed: "Success! Your booking is confirmed.", },
  error: { generic: "We couldn’t complete your booking. Please check your connection or try another time.", },
} as const;

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  vehicleType: string;
  date: string;
  timeSlot: string;
  notes: string;
}

export const BOOKING_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export type BookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const getInitialFormData = (): BookingFormData => ({
  name: "",
  phone: "",
  email: "",
  address: "",
  serviceType: "",
  vehicleType: "",
  date: "",
  timeSlot: "",
  notes: "",
});

export const isStepValid = (stepIndex: number, formData: BookingFormData): boolean => {
  switch (stepIndex) {
    case 0: 
      return Boolean(formData.name && formData.phone && formData.email);

    case 1: 
      return Boolean(
        formData.address &&
        formData.date &&
        formData.timeSlot &&
        formData.vehicleType &&
        formData.serviceType
      );

    case 2:
      return true;

    default:
      return false;
  }
};
