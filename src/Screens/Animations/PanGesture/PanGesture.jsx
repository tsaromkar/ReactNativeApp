import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const SIZE = 120;
const BOUNDARY_OFFSET = 50;

const PanGesture = () => {
    const pressed = useSharedValue(false);
    const offset = useSharedValue(0);
    const width = useSharedValue(0);

    const onLayout = (event) => {
        width.value = event.nativeEvent.layout.width;
    };

    const tap = Gesture.Pan()
        .onBegin(() => {
            pressed.value = true;
        })
        .onChange((event) => {
            // offset.value = event.translationX
            offset.value += event.changeX;
        })
        .onFinalize((event) => {
            pressed.value = false;
            // offset.value = withSpring(0);
            offset.value = withDecay({
                velocity: event.velocityX,
                rubberBandEffect: true,
                clamp: [
                    -(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
                    width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET,
                ]
            })
        }, [offset]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: pressed.value ? 'red' : 'orange',
            transform: [
                { translateX: offset.value },
                { scale: withSpring(pressed.value ? 1.2 : 1) }
            ]
        }
    })

    return (
        <View style={styles.container}>
            <View onLayout={onLayout} style={styles.wrapper}>
                <GestureDetector gesture={tap}>
                    <Animated.View style={[styles.circle, animatedStyle]}>
                        <Text style={styles.text}>PanGesture</Text>
                    </Animated.View>
                </GestureDetector>
            </View>
        </View>
    )
}

export default PanGesture

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: SIZE,
        height: SIZE,
        borderRadius: 60,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
    }
})