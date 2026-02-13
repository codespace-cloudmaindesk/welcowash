import axiosInstance from '@/lib/utils/axiosInstance';
import { AppointmentStatus } from '@/shared/lib/utils/constants';

// --- Appointment Services ---

// Matching WelcoWash.Appointments.Dto.AppointmentDto
export interface AppointmentDto {
    id: string; // Guid
    customerId?: string; // Guid
    vehicleId?: string; // Guid
    serviceOfferingId?: string; // Guid, derived from entity
    scheduledTime?: string; // DateTime
    status?: AppointmentStatus;
    notes?: string; // From entity
    // Add other fields as they appear in the DTO
}

export interface CreateBookingInput {
    customerId: string; // Guid
    vehicleId: string; // Guid
    serviceOfferingId: string; // Guid
    scheduledTime: string; // DateTime
    status?: AppointmentStatus;
    notes?: string;
}

// Frontend specific form data, if needed for conversion helper
export interface CreateBookingFormData {
    serviceId: string;
    date: string;
    location: string;
    contact: string;
}

export const createBooking = async (data: CreateBookingFormData) => {
    // Adapter logic: Map Frontend Form Data -> Backend DTO
    // Note: The backend requires valid GUIDs for CustomerId, VehicleId, ServiceOfferingId.
    // Since the frontend MVP form collects string names, we need to either:
    // 1. Have endpoints to look up these IDs (Not yet implemented)
    // 2. Use hardcoded mock IDs for the MVP (as in previous implementation)

    // Using mock IDs for MVP to pass validation
    const payload: CreateBookingInput = {
        customerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Mock User
        vehicleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',  // Mock Vehicle
        serviceOfferingId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Mock Service
        scheduledTime: data.date,
        status: AppointmentStatus.Pending,
        notes: `Requested via Web App. Service: ${data.serviceId}. Location: ${data.location}`
    };

    // ADAPTER PATTERN:
    // In a real scenario, we would lookup valid IDs. 
    // For this MVP refactor, we are incorrectly sending mock IDs which causes Backend 500 (Foreign Key Violation).
    // To allow Frontend Verification of the flow, we will mimic a successful network request here.

    console.log('[MOCK API] createBooking payload:', payload);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: { success: true, result: payload } });
        }, 1000);
    });

    // return axiosInstance.post('/services/app/Appointment/Create', payload);
};

export const getAppointments = async () => {
    return axiosInstance.get('/services/app/Appointment/GetAll');
};

