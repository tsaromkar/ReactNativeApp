import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Product from '@components/Product';
import { useProducts } from './useProducts';
import Filters from './Filters';
import TopDeals from './TopDeals';

const Products = () => {
    const {
        products,
        loading,
        lastVisible,
        search,
        setSearch,
        fetchProducts,
        handleSearch,
        selectedFilters,
        setSelectedFilters,
        productTypes,
        topDeals
    } = useProducts();

    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <TopDeals topDeals={topDeals} />
                <Text style={styles.text}>Products</Text>
                <TextInput
                    style={styles.textIput}
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={handleSearch}
                    placeholder="Search"
                />
                <Filters
                    productTypes={productTypes}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />
            </View>
        )
    }

    return (
        <>
            {loading && !products?.length ? (
                <View style={styles.activityIndContianer}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <View style={styles.root}>
                    {renderHeader()}
                    <FlatList
                        style={styles.flatList}
                        data={products}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
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
                </View>
            )}
        </>
    );
}

export default Products

const styles = StyleSheet.create({
    footer: { margin: 8 },
    root: { flex: 1, paddingVertical: 16 },
    header: { gap: 8, marginBottom: 8 },
    searchContainer: {
        marginHorizontal: 8,
    },
    textIput: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'grey',
        paddingHorizontal: 8,
        marginHorizontal: 8,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonNormal: {
        backgroundColor: '#007bff',
    },
    buttonPressed: {
        backgroundColor: '#0056b3',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    activityIndContianer: { flex: 1, justifyContent: "center" },
    text: { fontWeight: "700", color: "#333", fontSize: 16, marginHorizontal: 16 },
    flatList: { flex: 1 }
})