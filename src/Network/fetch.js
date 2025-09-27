import { BASE_URL } from "@env";

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

export const fetchGet = async (url) => {
    try {
        const res = await fetch(`${BASE_URL}${url}`, {
            method: 'GET', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // Indicate JSON content
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const resData = await res.json();

        const { status, message } = resData;

        if (!status) {
            throw new Error(message);
        }

        return resData;
    } catch (error) {
        throw error;
    }
}

export const fetchPost = async (url, body) => {
    try {
        const res = await fetch(`${BASE_URL}${url}`, {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // Indicate JSON content
            },
            body: JSON.stringify(body),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const resData = await res.json();

        const { status, message } = resData;

        if (!status) {
            throw new Error(message);
        }

        return resData;
    } catch (error) {
        throw error;
    }
}