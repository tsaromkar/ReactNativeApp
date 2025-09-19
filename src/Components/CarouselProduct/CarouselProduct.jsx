import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CarouselProduct = ({ product }) => {
    const { image, name, stock, price } = product;

    return (
        <View style={styles.root}>
            <Image source={{ uri: image }} style={styles.image}></Image>
            <View style={styles.info}>
                <Text style={styles.productName}>{name}</Text>
                <Text>{`In Stock: ${stock} units`}</Text>
                <Text>{`Price: ${price} Rs.`}</Text>
            </View>
        </View>
    )
}

export default CarouselProduct;

const styles = StyleSheet.create({
    root: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "white",
        borderRadius: 8,
        height: "100%",
        marginHorizontal: 8
    },
    image: {
        width: "100%",
        height: "70%",
        borderRadius: 8
    },
    info: {
        paddingTop: 8,
        justifyContent: "space-between"
    },
    productName: { fontWeight: '500' }
})