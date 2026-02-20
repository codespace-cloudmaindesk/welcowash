"use client";
import { handleActions } from "redux-actions";
import { ICustomerStateContext } from "./context";
import { CustomerActionEnums } from "./actions";
import { INITIAL_STATE } from "@/src/lib/common/constants";
import { mergePayloadHandler } from "@/src/lib/common/helper-methods";

export const CustomerReducer = handleActions<
  ICustomerStateContext,
  ICustomerStateContext
>(
  {
    // createCustomer
    [CustomerActionEnums.createCustomerPending]: mergePayloadHandler,
    [CustomerActionEnums.createCustomerSuccess]: mergePayloadHandler,
    [CustomerActionEnums.createCustomerError]: mergePayloadHandler,

    // getCustomers
    [CustomerActionEnums.getCustomersPending]: mergePayloadHandler,
    [CustomerActionEnums.getCustomersSuccess]: mergePayloadHandler,
    [CustomerActionEnums.getCustomersError]: mergePayloadHandler,
    },
  INITIAL_STATE
);