// Services available for booking
export const SERVICES = [
  { label: 'Premium Hand Wash', value: 'Premium Wash' },
  { label: 'Interior Detail', value: 'Interior Detail' },
  { label: 'Full Service', value: 'Full Service' },
] as const;

export type ServiceType = typeof SERVICES[number]['value'];

// Booking status options
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// Form placeholders
export const PLACEHOLDERS = {
  name: 'John Doe',
  location: '123 Main St, Sandton',
  date: '', // datetime-local input uses empty string
};

// Labels for form fields
export const LABELS = {
  service: 'Service',
  date: 'Date & Time',
  location: 'Location',
  name: 'Your Name',
};

// Success messages
export const SUCCESS_MESSAGES = {
  title: 'Booking Confirmed!',
  description: (date: string) => `We'll see you on ${date}.`,
};

// Error messages
export const ERROR_MESSAGES = {
  bookingFailed: 'Something went wrong. Please try again.',
};

// Default form data
export const DEFAULT_FORM_DATA = {
  name: '',
  date: '',
  service: SERVICES[0].value,
  location: '',
};
