import axios from 'axios';
import { BASE_URL } from "@env";

const api = axios.create({
    baseURL: BASE_URL, // Replace with your API's base URL
    timeout: 5000, // Timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        // Add any other default headers here
    },
});

api.interceptors.response.use(
    (response) => response.data, // always return `response.data`
    (error) => {
        if (error.response) {
            // Backend error response
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // Network error
            return Promise.reject({
                success: false,
                message: "Network error. Please try again.",
            });
        } else {
            // Something else
            return Promise.reject({
                success: false,
                message: error.message,
            });
        }
    }
);

export const axiosGet = async (url) => {
    try {
        const res = await api.get(url);
        return res;
    } catch (error) {
        throw error;
    }
}

export const axiosPost = async (url, body) => {
    try {
        const res = await api.post(url, body);
        return res;
    } catch (error) {
        throw error;
    }
}