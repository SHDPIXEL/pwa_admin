import axios from "axios";

// Base URL for the API
export const BASE_URL = "https://api.breboot.celagenex.com"; // Replace with your server's base URLadd
//export const BASE_URL = "http://192.168.1.16:4040";

// Create an Axios instance
const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json", // Default content type
    },
});

// Add a request interceptor (optional, for auth or logging)
API.interceptors.request.use(
    (config) => {
        // Example: Add an Authorization header
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor (optional, for global error handling)
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("API Response Error:", error.response || error.message);
        return Promise.reject(error.response?.data || error.message);
    }
);

export default API;
