import axios from 'axios';

// 1. Base Configuration
const api = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
  timeout: 30000,
});

// 2. Request Interceptor (Injects ABP Headers)
api.interceptors.request.use(
  (config) => {
    // A. Handle Authorization
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // B. Handle Multi-Tenancy (Crucial for ABP)
    const tenantId = localStorage.getItem('abp_tenant_id');
    if (tenantId) {
      config.headers['__tenantId'] = tenantId;
    }

    // C. Handle Culture/Language
    config.headers['.AspNetCore.Culture'] = 'c=en|uic=en';

    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor (Unwraps ABP Envelope & Handles Errors)
api.interceptors.response.use(
  (response) => {
    // ABP wraps successful responses in { result: ... }
    // We unwrap it here so your components just get the data
    return response.data?.result !== undefined ? response.data.result : response.data;
  },
  (error) => {
    // ABP Standard Error Format Handling
    if (error.response && error.response.data && error.response.data.error) {
      const abpError = error.response.data.error;

      // Log technically (for devs)
      console.error('ABP API Error:', abpError.message, abpError.details);

      // Reject with the user-friendly message
      return Promise.reject(new Error(abpError.message || 'An unexpected error occurred'));
    }

    // Fallback for network errors (500, 404, etc.)
    return Promise.reject(error);
  }
);

export default api;