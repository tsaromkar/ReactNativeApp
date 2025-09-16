import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import _isEmpty from "lodash/isEmpty";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "@env";

export const useLogin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const getTokens = async () => {
            try {
                const values = await AsyncStorage.multiGet(['accessToken', 'refreshToken']);
                const [, accessToken] = values[0];
                const [, refreshToken] = values[1];
                if (accessToken && refreshToken) {
                    // We have data!!
                    console.log(values);
                    navigation.navigate("Home");
                }
            } catch (error) {
                console.log("🚀 ~ getTokens ~ error:", error)
                // Error retrieving data
            }
        };
        getTokens();
    }, [navigation]);

    const isValid = () => {
        if (_isEmpty(name) && !isLogin) {
            setError("Please enter a valid name");
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(name) && !isLogin) {
            setError("Name should contain letters only");
            return false;
        }
        if (_isEmpty(email)) {
            setError("Please enter a valid email");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email");
            return false;
        }
        if (_isEmpty(password)) {
            setError("Please enter a valid password");
            return false;
        }
        if (!/^(?=.*[^a-zA-Z0-9]).{8,}$/.test(password)) {
            setError("Password should be min 8 chars & should contain letters, numbers and atleast one special character");
            return false;
        }
        return true;
    }

    const onLogin = async () => {
        setError(false);
        if (!isValid()) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const body = isLogin ? {
            email,
            password
        } : {
            name,
            email,
            password
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/${isLogin ? "login" : "signup"}`, {
                method: 'POST', // Specify the HTTP method
                headers: {
                    'Content-Type': 'application/json', // Indicate JSON content
                },
                body: JSON.stringify(body), // Convert data to JSON string
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const responseData = await response.json(); // Parse the JSON response
                const message = responseData.message;
                return Toast.show({
                    type: 'info',
                    text1: message,
                })
            }

            const responseData = await response.json(); // Parse the JSON response
            const { data, message } = responseData;
            Toast.show({
                type: 'success',
                text1: message,
            })
            await AsyncStorage.multiSet([
                ['accessToken', data.accessToken],
                ['refreshToken', data.refreshToken]
            ]);
            navigation.navigate("Home");
        } catch (error) {
            console.log("🚀 ~ onLogin ~ error:", error)
            return Toast.show({
                type: 'info',
                text1: "Something went wrong with the request",
            })
        } finally {
            setIsLoading(false);
        }
    }

    return {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        onLogin,
        error,
        isLogin,
        setIsLogin,
        isLoading
    }
}