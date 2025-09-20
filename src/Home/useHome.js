import messaging from "@react-native-firebase/messaging";
import { axiosPost } from "@network/axios";
import { useEffect, useState } from "react";

export const useHome = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        messaging().getToken().then(setToken);
    }, []);

    const getNotification = async () => {
        if (!token) return;
        try {
            await axiosPost("/notify-api/get-notification", {
                token,
            });
        } catch (error) {
            console.log("🚀 ~ getNotification ~ error:", error.message)
        }
    }

    return {
        getNotification
    }
}