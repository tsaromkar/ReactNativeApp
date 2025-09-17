import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CarousalProduct from '@components/CarousalProduct'

const Carousel = ({ topDeals }) => {
    return (
        <>
            <Text style={styles.text}>Top Deals</Text>
            <FlatList
                style={styles.flatlist}
                data={topDeals}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    const marginRight = index === topDeals.length - 1 ? 8 : 0;
                    return (
                        <View style={[styles.item, { marginRight }]}>
                            <CarousalProduct product={item} />
                        </View>
                    )
                }}
            />
        </>
    )
}

export default Carousel

const styles = StyleSheet.create({
    flatlist: { paddingVertical: 4 },
    item: { marginLeft: 8 },
    text: { fontWeight: "700", color: "#333", fontSize: 16, marginHorizontal: 16 }
})