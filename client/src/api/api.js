import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
});

// Surface the server's error message instead of the generic axios one
API.interceptors.response.use(
  (response) => response,
  (error) => {
    error.message = error.response?.data?.message || error.message;
    return Promise.reject(error);
  },
);

export default API;
