import { Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { logout } from '@utils/auth';

const Home = () => {

    const navigation = useNavigation();

    const onClickNavigateToProducts = () => {
        navigation.navigate("Products");
    }

    const onLogout = async () => {
        await logout();
        navigation.navigate("Login");
    }

    return (
        <>
            <Pressable
                onPress={onClickNavigateToProducts}
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : styles.buttonNormal,
                ]}
            >
                <Text style={styles.buttonText}>Show Products</Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate("Pagination")}
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : styles.buttonNormal,
                ]}
            >
                <Text style={styles.buttonText}>Pagination</Text>
            </Pressable>
            <Pressable
                onPress={onLogout}
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : styles.buttonNormal,
                ]}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </Pressable>
        </>
    )
}

export default Home;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },
    buttonNormal: {
        backgroundColor: '#007bff',
    },
    buttonPressed: {
        backgroundColor: '#0056b3',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
})