import { ActivityIndicator, Button, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from "@env";
import Product from '../Components/Product';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const pageSize = 10;

    const fetchProducts = async (loadMore = false) => {
        try {
            setLoading(true);

            let url = `${BASE_URL}/api/get-products?pageSize=${pageSize}`;
            if (loadMore && lastVisible) {
                url += `&lastVisible=${lastVisible}`;
            }

            const res = await fetch(url);
            const data = await res.json();
            console.log("🚀 ~ fetchProducts ~ data:", data)

            if (loadMore) {
                setProducts(prev => [...prev, ...data.products]);
            } else {
                setProducts(data.products);
            }

            setLastVisible(data.lastVisible);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <View style={{ flex: 1, paddingVertical: 16 }}>
            {loading && !products?.length ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Product product={item} />
                    )}
                    ListFooterComponent={() =>
                        lastVisible ? (
                            <View style={styles.footer}>
                                <Button
                                    title={loading ? "Loading..." : "Load More"}
                                    onPress={() => fetchProducts(true)}
                                    disabled={loading}
                                />
                            </View>
                        ) : null
                    }
                />
            )}
        </View>
    );
}

export default Products

const styles = StyleSheet.create({
    footer: { margin: 8 }
})