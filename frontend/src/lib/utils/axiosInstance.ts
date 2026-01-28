import axios from "axios";

export const axiosInstance = () => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};