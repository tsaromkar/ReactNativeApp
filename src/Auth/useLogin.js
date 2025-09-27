import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import _isEmpty from "lodash/isEmpty";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosPost } from '@network/axios';

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
            const res = await axiosPost(`/user-api/${isLogin ? "login" : "signup"}`, body);
            const { data, message } = res;
            Toast.show({
                type: 'success',
                text1: message,
            })
            await AsyncStorage.multiSet([
                ['accessToken', data.accessToken],
                ['refreshToken', data.refreshToken]
            ]);
            navigation.navigate("Home");
        } catch (error) { } finally {
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