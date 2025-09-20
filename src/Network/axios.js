import axios from 'axios';
import { BASE_URL } from "@env";

const instance = axios.create({
    baseURL: BASE_URL, // Replace with your API's base URL
    timeout: 5000, // Timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        // Add any other default headers here
    },
});

export const axiosGet = async (url) => {
    console.log("🚀 ~ get ~ url:", url)
    try {
        const res = await instance.get(url);
        console.log("🚀 ~ get ~ res:", res)
        const resData = res.data;
        const { status, message } = resData

        if (!status) {
            throw new Error(message);
        }

        return resData;
    } catch (error) {
        throw error;
    }
}

export const axiosPost = async (url, body) => {
    console.log("🚀 ~ post ~ url:", url)
    try {
        const res = await instance.post(url, body);
        console.log("🚀 ~ post ~ res:", res)
        const resData = res.data;
        const { status, message } = resData

        if (!status) {
            throw new Error(message);
        }

        return resData;
    } catch (error) {
        throw error;
    }
}