import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TransformAnimation = () => {

    return (
        <View style={styles.container}>
            <TransformNormal />
            <TransformAnimatedStyle />
        </View>
    )
}

const TransformNormal = () => {
    const translateX = useSharedValue(0);

    const handleMoveRight = () => {
        translateX.value = withSpring(translateX.value + 50);
    }

    const handleMoveLeft = () => {
        translateX.value = withSpring(translateX.value - 50);
    }

    return (
        <>
            <View style={styles.buttonContainer}>
                <Button
                    title="Move Right"
                    onPress={handleMoveRight}
                />
                <Button
                    title="Move Left"
                    onPress={handleMoveLeft}
                />
            </View>
            <Animated.View
                style={[styles.box, { transform: [{ translateX }] }]}
            />
        </>
    )
}

const TransformAnimatedStyle = () => {
    const translateX = useSharedValue(0);
    const scale = useSharedValue(1);

    const handleMoveRight = () => {
        translateX.value += 50;
        scale.value += 0.1;
    }
    const handleMoveLeft = () => {
        translateX.value -= 50;
        scale.value -= 0.1;
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withSpring(translateX.value * 2) },
            { scale: withSpring(scale.value) }]
        }
    })

    return (
        <>
            <View style={styles.buttonContainer}>
                <Button
                    title="Move Right"
                    onPress={handleMoveRight}
                />
                <Button
                    title="Move Left"
                    onPress={handleMoveLeft}
                />
            </View>
            <Animated.View
                style={[styles.box, animatedStyle]}
            />
        </>
    )
}

export default TransformAnimation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: "orange",
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10
    }
})