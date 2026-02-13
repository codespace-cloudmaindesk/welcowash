import axios from 'axios';

// Base URL from ASP.NET Core launchSettings.json
// In production, this should come from environment variables
const API_BASE_URL = 'https://localhost:44311/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors can be added here for auth tokens, error handling, etc.
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
