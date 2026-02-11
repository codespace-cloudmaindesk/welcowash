import { INITIAL_STATE } from "@/lib/common/constants";
import { createContext } from "react";

// ==================== ENUMS ====================
export enum RefListAppointmentStatus {
  Pending = 1,
  Confirmed = 2,
  InProgress = 3,
  Completed = 4,
  Cancelled = 5,
  NoShow = 6,
}

// ==================== INTERFACES ====================
export interface IAppointment {
  id: string;
  status: RefListAppointmentStatus;
  scheduledTime: string;
  serviceOffering: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
  vehicle: {
    id: string;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

// ==================== STATE CONTEXT ====================
export interface IAppointmentStateContext {
  appointment: IAppointment | null;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: string | null;
}

// ==================== ACTION CONTEXT ====================
export interface IAppointmentActionContext {
  getAppointmentById: (id: string) => Promise<void>;
  createAppointment: (appointment: IAppointment) => Promise<void>;
  updateAppointment: (appointment: IAppointment) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
}

// ==================== CONTEXT ====================
export const AppointmentStateContext = createContext<IAppointmentStateContext>(INITIAL_STATE);
export const AppointmentActionContext = createContext<IAppointmentActionContext | undefined>(undefined);