import axios from 'axios';
import { BASE_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { getGlobalSetTokens } from '@contexts/contexts/AuthContext';
import { logout } from '@utils/auth';

let isRefreshing = false;
let refreshSubscribers = [];
const setTokens = getGlobalSetTokens(); // 👈 get context setter

// Function to notify all waiting requests once refresh is done
function onRefreshed(newAccessToken) {
    refreshSubscribers.forEach((callback) => callback(newAccessToken));
    refreshSubscribers = [];
}

// Add a request to the queue
function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}

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
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response.data, // always return `response.data`
    async (error) => {
        if (error.response) {
            const originalRequest = error.config;

            // If 401 and not already retried
            if (error.response?.status === 403 && !originalRequest._retry) {
                originalRequest._retry = true;

                if (error.response.data.expired === "refreshToken") {
                    isRefreshing = false;
                    refreshSubscribers = [];
                    // ❌ Refresh failed → force logout
                    logout(setTokens);
                    return Promise.reject(error.response.data);
                }

                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        const values = await AsyncStorage.multiGet(['accessToken', 'refreshToken']);
                        const [, refreshToken] = values[1];

                        // 🔄 Call refresh endpoint
                        const res = await axiosPost(`/user-api/refresh`, { refreshToken });

                        // Save new tokens
                        const { data, message } = res;
                        Toast.show({
                            type: 'success',
                            text1: message,
                        })
                        setTokens({ accessToken: data.accessToken, refreshToken });

                        // Mark refresh complete
                        isRefreshing = false;
                        onRefreshed(data.accessToken);

                        // Retry failed request with new token
                        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
                        return api(originalRequest);
                    } catch (error) {
                        isRefreshing = false;
                        refreshSubscribers = [];
                        // ❌ Refresh failed → force logout
                        logout(setTokens);
                        return Promise.reject(error);
                    }
                }

                // If already refreshing, queue the request
                return new Promise((resolve) => {
                    addRefreshSubscriber((newAccessToken) => {
                        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        resolve(api(originalRequest));
                    });
                });
            }

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