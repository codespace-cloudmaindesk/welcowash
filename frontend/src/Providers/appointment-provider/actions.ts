'use client'
import { createAction } from 'redux-actions';
import { IAppointment, IAppointmentStateContext } from './context';
import { RequestState } from '../../lib/common/constants';

export enum AppointmentActionEnums {

  // Create Appointment
  createAppointmentPending = 'CREATE_APPOINTMENT_PENDING',
  createAppointmentSuccess = 'CREATE_APPOINTMENT_SUCCESS',
  createAppointmentError = 'CREATE_APPOINTMENT_ERROR',
}

// ==================== CREATE STUDENT ====================
export const createStudentPending = createAction<Partial<IAppointmentStateContext>>(
  AppointmentActionEnums.createAppointmentPending,
  () => RequestState.Pending
);

export const createStudentSuccess = createAction<Partial<IAppointmentStateContext>, IAppointment>(
  AppointmentActionEnums.createAppointmentSuccess,
  (appointment: IAppointment) => ({
    ...RequestState.Success,
    appointment
  })
);

export const createStudentError = createAction<Partial<IAppointmentStateContext>, string>(
  AppointmentActionEnums.createAppointmentError,
  (error: string) => ({ ...RequestState.Error, error })
);