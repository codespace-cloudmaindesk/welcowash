"use client";
import { handleActions } from "redux-actions";
import { IAppointmentStateContext } from "./context";
import { AppointmentActionEnums } from "./actions";
import { INITIAL_STATE } from "@/lib/common/constants";
import { mergePayloadHandler } from "@/lib/common/helper-methods";

export const AppointmentReducer = handleActions<
  IAppointmentStateContext,
  IAppointmentStateContext
>(
  {
    // createAppointment
    [AppointmentActionEnums.createAppointmentPending]: mergePayloadHandler,
    [AppointmentActionEnums.createAppointmentSuccess]: mergePayloadHandler,
    [AppointmentActionEnums.createAppointmentError]: mergePayloadHandler,

  },
  INITIAL_STATE
);