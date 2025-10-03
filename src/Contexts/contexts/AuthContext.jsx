import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { axiosPost } from '../../Network/axios';

export const AuthContext = createContext(null);
let globalSetTokens = null;

export const AuthProvider = ({ children }) => {
    const [tokens, setTokens] = useState(null);

    const handleSetToken = async (data) => {
        try {
            if (data) {
                await AsyncStorage.multiSet([
                    ['accessToken', data.accessToken],
                    ['refreshToken', data.refreshToken]
                ]);
                setTokens({ ...data });
            } else {
                await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
                setTokens(null);
            }
        } catch (error) {

        }
    }

    // to be used in axios
    globalSetTokens = handleSetToken;

    useEffect(() => {
        const getTokens = async () => {
            try {
                const values = await AsyncStorage.multiGet(['accessToken', 'refreshToken']);
                const [, accessToken] = values[0];
                const [, refreshToken] = values[1];
                if (accessToken && refreshToken) {
                    // We have data!!
                    const res = await axiosPost('/user-api/verify-tokens', { refreshToken })

                    if (res?.success) {
                        setTokens({
                            accessToken,
                            refreshToken
                        })
                    }
                }
            } catch (error) {
                console.log("🚀 ~ getTokens ~ error:", error)
                // Error retrieving data
            }
        };
        getTokens();
    }, []);

    return (
        <AuthContext.Provider value={{ tokens, setTokens: handleSetToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const getGlobalSetTokens = () => globalSetTokens;