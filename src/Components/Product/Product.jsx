import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Product = ({ product }) => {

    const { image, name, stock, price } = product;

    return (
        <View style={styles.root}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.productName}>{name}</Text>
                <Text>{`In Stock: ${stock} units`}</Text>
                <Text>{`Price: ${price} Rs.`}</Text>
            </View>
        </View>
    )
}

export default Product;

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "white",
        marginBottom: 8,
        marginHorizontal: 8,
        borderRadius: 8,
        elevation: 2
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 12,
        borderRadius: 8
    },
    info: {
        paddingVertical: 8,
        justifyContent: "space-between"
    },
    productName: { fontWeight: '500' }
})