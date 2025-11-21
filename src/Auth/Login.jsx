import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useLogin } from './useLogin';

const Login = () => {
    const {
        formik,
        isLogin,
        setIsLogin,
    } = useLogin();
    const { handleSubmit, values, errors, touched, isSubmitting, handleChange, handleBlur } = formik;

    return (
        <View style={styles.container}>
            {!isLogin &&
                <>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        placeholder="John Doe"
                    />
                    {errors.name && touched.name && <Text style={styles.error}>{errors.name}</Text>}
                </>}
            <TextInput
                style={styles.textinputWithMargin}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="johndoe@abc.com"
                keyboardType='email-address'
            />
            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput
                style={styles.textinputWithMargin}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
                onSubmitEditing={handleSubmit}
            // secureTextEntry={true}
            />
            {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}
            <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : styles.buttonNormal,
                ]}
                disabled={isSubmitting}
            >
                <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign up"}</Text>
                    <View style={styles.buttonSpacing} />
                    {isSubmitting && <ActivityIndicator size="small" color={"white"} />}
                </View>
            </Pressable>

            <View style={styles.links}>
                <Pressable
                    onPress={() => setIsLogin(true)}
                    style={isLogin ? styles.selectedLinkBg : styles.linkBg}
                >
                    <Text style={isLogin ? styles.selectedTextLink : styles.textLink}>Login</Text>
                </Pressable>
                <View style={styles.linkSpacing} />
                <Pressable
                    onPress={() => setIsLogin(false)}
                    style={isLogin ? styles.linkBg : styles.selectedLinkBg}
                >
                    <Text style={isLogin ? styles.textLink : styles.selectedTextLink}>
                        Sign up
                    </Text>
                </Pressable>
            </View>
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
    textinputWithMargin: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingStart: 8,
        marginTop: 8
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },
    buttonContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSpacing: {
        margin: 4
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
    },
    links: { flexDirection: 'row', marginTop: 10, justifyContent: 'center' },
    linkSpacing: {
        margin: 5
    },
    textLink: { color: "black", cursor: 'pointer' },
    selectedTextLink: { color: "white", cursor: 'pointer' },
    linkBg: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4 },
    selectedLinkBg: { backgroundColor: 'green', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4 }
})