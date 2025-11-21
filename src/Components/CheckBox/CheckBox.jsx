import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CheckBox = ({ label, checked, onChangeChecked }) => {
    return (
        <Pressable style={styles.root}
            onPress={() => onChangeChecked(label)}>
            <View style={styles.outer}>
                {checked && <View style={styles.inner} />}
            </View>
            <Text>{label}</Text>
        </Pressable>
    )
}

export default CheckBox

const styles = StyleSheet.create({
    root: { flexDirection: "row", alignItems: "center" },
    outer: {
        borderWidth: 1,
        width: 16,
        height: 16,
        borderColor: "#aaa",
        marginRight: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    inner: {
        width: 10,
        height: 10,
        backgroundColor: "green"
    }
})