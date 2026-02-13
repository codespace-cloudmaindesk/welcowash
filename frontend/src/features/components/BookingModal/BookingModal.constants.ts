import { BookingStep } from "@/shared/lib/utils/constants";

export const BOOKING_STEPS: readonly BookingStep[] = [
  {title: "Service Selection",description: "Choose the service that best suits your needs.",},
  {title: "Date & Time",description: "Select a date and time that works for you.",},
  {title: "Location",description: "Enter your location for the service.",},
  {title: "Contact Information",description: "Provide your contact information for the booking.",},
  {title: "Confirmation",description: "Review your booking details and confirm.",},
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
  date: "",
  timeSlot: "",
  notes: "",
});

export const isStepValid = (stepIndex: number, formData: BookingFormData): boolean => {
  switch (stepIndex) {
    case 0:
      return Boolean(formData.name && formData.phone && formData.email);

    case 1:
      return Boolean(formData.address);

    case 2:
      return Boolean(formData.date && formData.timeSlot);

    case 3:
      return Boolean(formData.serviceType);

    case 4:
      return true;

    default:
      return false;
  }
};
