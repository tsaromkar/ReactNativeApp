import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const TapGesture = () => {
    const pressed = useSharedValue(false);

    const tap = Gesture.Tap()
        .onBegin(() => {
            pressed.value = true;
        }).onFinalize(() => {
            pressed.value = false;
        })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: pressed.value ? 'red' : 'orange',
            transform: [{ scale: withSpring(pressed.value ? 1.2 : 1) }]
        }
    })

    return (
        <View style={styles.container}>
            <GestureDetector gesture={tap}>
                <Animated.View style={[styles.circle, animatedStyle]}>
                    <Text style={styles.text}>TapGesture</Text>
                </Animated.View>
            </GestureDetector>
        </View>
    )
}

export default TapGesture

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
    }
})