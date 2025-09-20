import { BASE_URL } from "@env";

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

export const get = async (url) => {
    console.log("🚀 ~ get ~ url:", url)
    try {
        const res = await fetch(`${BASE_URL}${url}`, {
            method: 'GET', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // Indicate JSON content
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            const responseData = await res.json(); // Parse the JSON response
            const message = responseData.message;
            throw new Error(message);
        }

        const json = await res.json();
        console.log("🚀 ~ get ~ json:", json)
        return json;
    } catch (error) {
        throw error;
    }
}

export const post = async (url, body) => {
    console.log("🚀 ~ post ~ url:", url)
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

        if (!res.ok) {
            const responseData = await res.json(); // Parse the JSON response
            const message = responseData.message;
            throw new Error(message);
        }

        const json = await res.json();
        console.log("🚀 ~ post ~ json:", json)
        return json;
    } catch (error) {
        throw error;
    }
}