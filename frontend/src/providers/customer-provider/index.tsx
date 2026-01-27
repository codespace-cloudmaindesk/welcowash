"use client";
import React, { useContext, useReducer } from "react";
import { ICustomer, CustomerStateContext, CustomerActionContext } from "./context";
import {
  createCustomerPending,
  createCustomerSuccess,
  createCustomerError,
} from "./actions";

import { axiosInstance } from "../../lib/utils/axiosInstance";
import { CustomerReducer } from "./reducer";
import { INITIAL_STATE } from "@/src/lib/common/constants";

export const CustomerProvider = ({
    children,
}: {
    children: React.ReactNode ;
}) => {
    const [state, dispatch] = useReducer(CustomerReducer, INITIAL_STATE);
    const instance = axiosInstance();

    const createCustomer = async (customer: ICustomer) => {
        dispatch(createCustomerPending());
        const endpoint = "Customer/Create";
        await instance
      .post(endpoint, customer)
      .then((response) => {
        dispatch(createCustomerSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(createCustomerError(err.message));
      });
  };

    return (
    <CustomerActionContext.Provider
      value={{
        createCustomer,
      }}
    >
      <CustomerStateContext.Provider value={state}>
        {children}
      </CustomerStateContext.Provider>
    </CustomerActionContext.Provider>
  );
};

export const useCustomerState = () => {
  const context = useContext(CustomerStateContext);
  if (!context) {
    throw new Error("useCustomerState must be used within a CustomerProvider");
  }
  return context;
};

export const useCustomerActions = () => {
  const context = useContext(CustomerActionContext);
  if (!context) {
    throw new Error("useCustomerActions must be used within a CustomerProvider");
  }
  return context;
};