import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async () => {
    console.log("remove keys")
    try {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    } catch (error) {
        console.log("🚀 ~ removeTokens ~ error:", error)
        // Error removing data
    }
};