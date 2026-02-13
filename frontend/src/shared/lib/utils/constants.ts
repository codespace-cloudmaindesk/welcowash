export const APP_NAME = "WelcoWash";

export const RequestState = {
    Pending: { isPending: true, isSuccess: false, isError: false },
    Success: { isPending: false, isSuccess: true, isError: false },
    Error: { isPending: false, isSuccess: false, isError: true },
};

export const INITIAL_STATE = {
    appointment: null,
    error: null,
    isPending: false,
    isSuccess: false,
    isError: false,
};

export enum AppointmentStatus {
  Pending = 1,
  Confirmed = 2,
  InProgress = 3,
  Completed = 4,
  Cancelled = 5,
  NoShow = 6,
};

export enum ServiceName {
  ExteriorWash = 1,
  InteriorVacuuming = 2,
  FullDetailing = 3,
  WaxingPolishing = 4,
  TireWheelCleaning = 5,
  EngineCleaning = 6,
};

export interface BookingStep {
    title: string;
    description: string;

    
};

