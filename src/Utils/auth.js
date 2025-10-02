import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async (setTokens) => {
    try {
        if (setTokens) setTokens(null);
        await AsyncStorage.clear();
    } catch (error) {
        console.log("🚀 ~ removeTokens ~ error:", error)
        // Error removing data
    }
};