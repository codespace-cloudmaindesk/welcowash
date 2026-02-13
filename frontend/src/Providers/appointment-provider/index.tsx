import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createBooking, getAppointments, CreateBookingFormData } from '@/services/api';
import { AppointmentStatus } from '@/shared/lib/utils/constants';

// Define the shape of an Appointment object
// This should match the DTO returned from the backend
export interface Appointment {
    id: string;
    serviceOfferingId?: string;
    customerName?: string;
    vehicleId?: string;
    scheduledTime: string; // ISO date
    status: AppointmentStatus;
    notes?: string;
    location?: string;
}

interface AppointmentContextType {
    appointments: Appointment[];
    isLoading: boolean;
    error: string | null;
    bookAppointment: (data: CreateBookingFormData) => Promise<void>;
    refreshAppointments: () => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refreshAppointments = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getAppointments();
            // AsyncCrudAppService GetAll returns { totalCount: number, items: [] }
            setAppointments(response.data.items || []);
        } catch (err) {
            console.error("Failed to fetch appointments", err);
            // Don't set global error on fetch fail to avoid blocking UI, just log it
            // or set a specific fetch error state
        } finally {
            setIsLoading(false);
        }
    };

    const bookAppointment = async (data: CreateBookingFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            await createBooking(data);
            await refreshAppointments();
        } catch (err: any) {
            console.error("Booking failed", err);
            const msg = err.response?.data?.error?.message || "Failed to book appointment.";
            setError(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        refreshAppointments();
    }, []);

    const value = {
        appointments,
        isLoading,
        error,
        bookAppointment,
        refreshAppointments
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointments = () => {
    const context = useContext(AppointmentContext);
    if (context === undefined) {
        throw new Error('useAppointments must be used within an AppointmentProvider');
    }
    return context;
};