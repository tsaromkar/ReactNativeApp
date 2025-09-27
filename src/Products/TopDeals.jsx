import { StyleSheet, Text } from 'react-native'
import React from 'react'
import CarouselProduct from '@components/CarouselProduct'
import ReanimatedCarousel from '@components/ReanimatedCarousel'

const TopDeals = ({ topDeals }) => {
    if (!topDeals) return null;
    return (
        <>
            <Text style={styles.text}>Top Deals</Text>
            <ReanimatedCarousel
                data={topDeals}
                renderItem={({ item }) => {
                    return (
                        <CarouselProduct product={item} />
                    )
                }}
            />
        </>
    )
}

export default TopDeals

const styles = StyleSheet.create({
    item: { marginLeft: 8 },
    text: { fontWeight: "700", color: "#333", fontSize: 16, marginHorizontal: 16 }
})