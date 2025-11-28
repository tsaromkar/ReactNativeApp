import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const WidthAnimation = () => {
    const width = useSharedValue(100);

    const grow = () => {
        width.value = withSpring(width.value + 50);
    }

    const shrink = () => {
        width.value = withTiming(width.value - 50);
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title="Grow"
                    onPress={grow}
                />
                <Button
                    title="Shrink"
                    onPress={shrink}
                />
            </View>
            <Animated.View
                style={[styles.box, { width: width }]}
            />
        </View>
    )
}

export default WidthAnimation;

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
        borderRadius: 10,
        alignSelf: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10
    }
})