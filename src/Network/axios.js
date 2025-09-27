import axios from 'axios';
import { BASE_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const api = axios.create({
    baseURL: BASE_URL, // Replace with your API's base URL
    timeout: 5000, // Timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        // Add any other default headers here
    },
});

api.interceptors.request.use(
    async (config) => {
        const values = await AsyncStorage.multiGet(['accessToken', 'refreshToken']);
        const [, accessToken] = values[0];
        const [, refreshToken] = values[1];
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response.data, // always return `response.data`
    (error) => {
        console.log("🚀 ~ error:", error)
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
        Toast.show({
            type: 'error',
            text1: error.message,
        })
        throw error;
    }
}

export const axiosPost = async (url, body) => {
    try {
        const res = await api.post(url, body);
        return res;
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: error.message,
        })
        throw error;
    }
}