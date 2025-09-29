import { useState } from 'react';
import Toast from 'react-native-toast-message';
import _isEmpty from "lodash/isEmpty";
import { axiosPost } from '@network/axios';
import useAuthContext from '@contexts/hooks/useAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { setTokens } = useAuthContext();

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
            setTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            })
        } catch (error) {
            console.log("🚀 ~ onLogin ~ error:", error)
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