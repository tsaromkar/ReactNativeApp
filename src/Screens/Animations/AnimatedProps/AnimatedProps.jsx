import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedProps = () => {
    const r = useSharedValue(50);

    const handleAnimated = () => {
        r.value += 10;
    }

    const animatedProps = useAnimatedProps(() => {
        return {
            r: withTiming(r.value)
        }
    })

    return (
        <>
            <View style={styles.buttonContainer}>
                <Button
                    title="Animate"
                    onPress={handleAnimated}
                />
            </View>
            <Svg style={styles.svg}>
                <AnimatedCircle
                    fill="orange"
                    cx={"50%"}
                    cy={"50%"}
                    animatedProps={animatedProps}
                />
            </Svg>
        </>
    )
}

export default AnimatedProps;

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
    },
    svg: {
        height: 250,
        width: '100%',
    }
})

