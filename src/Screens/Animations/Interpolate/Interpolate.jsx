import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const Interpolate = () => {
    const offset = useSharedValue(0);

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Box offset={offset} extrapolateType="extend" />
                <Box offset={offset} extrapolateType="clamp" />
                <Box offset={offset} extrapolateType="identity" />
            </View>
        </View>
    )
}

const Box = (props) => {
    const { offset, extrapolateType } = props;

    const pan = Gesture.Pan()
        .onChange((event) => {
            offset.value = event.translationX;
        })
        .onFinalize(() => {
            offset.value = withSpring(0);
        })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value },
                {
                    rotate: interpolate(
                        offset.value,
                        [-100, 0, 100],
                        [-360, 0, 360],
                        extrapolateType
                    ) + 'deg'
                },
                { scale: interpolate(offset.value, [-100, 0, 100], [0.8, 1, 0.8]) }
            ],
        }
    })

    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={[styles.box, animatedStyle]}>
                <Text style={styles.text}>{extrapolateType.toUpperCase()}</Text>
            </Animated.View>
        </GestureDetector>
    )
}

export default Interpolate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        width: 200,
        height: 700,
        paddingVertical: 100,
        borderLeftWidth: 1,
        borderLeftColor: 'red',
        borderRightWidth: 1,
        borderRightColor: 'red',
        borderStyle: 'dashed',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'orange',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white'
    }
})