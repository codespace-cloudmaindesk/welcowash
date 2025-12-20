import axios from 'axios';

// Base API Configuration
const api = axios.create({
    baseURL: 'http://localhost:8000', // Connects to FastAPI Backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

// Typed Wrapper for generic requests if needed
export const checkBackendStatus = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error("Backend Error:", error);
        return null;
    }
};

export const createBooking = async (data: any) => {
    return await api.post('/bookings', data);
};

export const getBookingStatus = async (id: string) => {
    return await api.get(`/bookings/${id}`);
};
