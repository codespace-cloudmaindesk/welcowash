"use client";
import React, { useContext, useReducer } from "react";
import { ICustomer, CustomerStateContext, CustomerActionContext } from "./context";
import {
  createCustomerPending,
  createCustomerSuccess,
  createCustomerError,
  getCustomersPending,
  getCustomersSuccess,
  getCustomersError,
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
      try {
        const response = await instance.post(endpoint, customer);
        dispatch(createCustomerSuccess(response.data.result));
      } catch (error : any) {
        dispatch(createCustomerError(error.message));
      }
    };

    const getCustomers = async () => {
    dispatch(getCustomersPending());
    const endpoint = "Customer/GetAll";
    try {
        const response = await instance.get(endpoint);
        dispatch(getCustomersSuccess(response.data.result));
    } catch (error: any) {
        dispatch(getCustomersError(error.message));
    }

  };

    return (
    <CustomerActionContext.Provider
      value={{
        createCustomer,
        getCustomers,
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

