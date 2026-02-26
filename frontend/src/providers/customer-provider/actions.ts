'use client'
import { createAction } from 'redux-actions';
import { ICustomer, ICustomerStateContext } from './context';
import { RequestState } from '@/src/lib/common/constants';

export enum CustomerActionEnums {
    // Create Customer
    createCustomerPending = 'CREATE_CUSTOMER_PENDING',
    createCustomerSuccess = 'CREATE_CUSTOMER_SUCCESS',
    createCustomerError = 'CREATE_CUSTOMER_ERROR',

    // Get All Customers
    getCustomersPending = 'GET_CUSTOMERS_PENDING',
    getCustomersSuccess = 'GET_CUSTOMERS_SUCCESS',
    getCustomersError = 'GET_CUSTOMERS_ERROR',
}

// ==================== CREATE CUSTOMER ====================
export const createCustomerPending = createAction<ICustomerStateContext>(
    CustomerActionEnums.createCustomerPending,
    () => ({...RequestState.Pending })
);

export const createCustomerSuccess = createAction<ICustomerStateContext, ICustomer>(
    CustomerActionEnums.createCustomerSuccess,
    (customer: ICustomer) => ({
        ...RequestState.Success,
        customer
    })
);

export const createCustomerError = createAction<ICustomerStateContext, string>(
    CustomerActionEnums.createCustomerError,
    (error: string) => ({ ...RequestState.Error, error })
);

// ==================== GET ALL CUSTOMERS ====================
export const getCustomersPending = createAction<ICustomerStateContext>(
    CustomerActionEnums.getCustomersPending,
    () => ({...RequestState.Pending })
);

export const getCustomersSuccess = createAction<ICustomerStateContext, ICustomer[]>(
    CustomerActionEnums.getCustomersSuccess,
    (customers: ICustomer[]) => ({
        ...RequestState.Success,
        customers
    })
);

export const getCustomersError = createAction<ICustomerStateContext, string>(
    CustomerActionEnums.getCustomersError,
    (error: string) => ({ ...RequestState.Error, error })
);
