import { Button, StyleSheet, View } from 'react-native'
import React from 'react'

const Animations = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Button title="Width Animation" onPress={() => navigation.navigate('WidthAnimation')} />
            <Button title="Transform Animation" onPress={() => navigation.navigate('TransformAnimation')} />
            <Button title="Animated Props" onPress={() => navigation.navigate('AnimatedProps')} />
            <Button title="Tap Gesture" onPress={() => navigation.navigate('TapGesture')} />
            <Button title="Pan Gesture" onPress={() => navigation.navigate('PanGesture')} />
        </View>
    )
}

export default Animations;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 10
    }
})