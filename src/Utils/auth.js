import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async (setTokens) => {
    try {
        await AsyncStorage.clear();
        if (setTokens) setTokens(null);
    } catch (error) {
        console.log("🚀 ~ removeTokens ~ error:", error)
        // Error removing data
    }
};