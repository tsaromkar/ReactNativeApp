import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useLogin } from './useLogin';

const Login = () => {
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        onLogin,
        error
    } = useLogin();

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textinput}
                onChangeText={text => setName(text)}
                value={name}
                placeholder="John Doe"
            />
            <TextInput
                style={[styles.textinput, { marginTop: 8 }]}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="johndoe@abc.com"
                keyboardType='email-address'
            />
            <TextInput
                style={[styles.textinput, { marginTop: 8 }]}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="Password"
            // secureTextEntry={true}
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <Pressable
                onPress={onLogin}
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : styles.buttonNormal,
                ]}
            >
                <Text style={styles.buttonText}>Press Me</Text>
            </Pressable>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16
    },
    textinput: { height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 8, paddingStart: 8 },
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
    error: {
        color: 'red',
        fontSize: 16,
        marginTop: 4,
    }
})