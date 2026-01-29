import { INITIAL_STATE } from "@/src/lib/common/constants";
import { createContext } from "react";

// ==================== REFERENCE LIST ENUMS ====================
export enum RefListGender {
    Male = 1,
    Female = 2,
    Other = 3,
    PreferNotToSay = 4,
}

// ==================== ENTITIES ====================
export interface ICustomer {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
}

// ==================== CUSTOMER CONTEXT ====================
export interface ICustomerStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    error?: string;
    customer?: ICustomer;
}

// ==================== CUSTOMER ACTION CONTEXT ====================
export interface ICustomerActionContext {
    createCustomer: (customer: ICustomer) => Promise<void>;
}

export const CustomerStateContext = createContext<ICustomerStateContext>(INITIAL_STATE);
export const CustomerActionContext = createContext<ICustomerActionContext | undefined>(undefined);