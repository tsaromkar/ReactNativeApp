import { ActivityIndicator, Button, FlatList, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Product from '../Components/Product';
import { useProducts } from './useProducts';
import Filters from './Filters';

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
        productTypes
    } = useProducts();

    return (
        <>
            {loading && !products?.length ? (
                <View style={styles.activityIndContianer}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <View style={styles.root}>
                    <View style={styles.searchContainer}>
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
                    <FlatList
                        style={{ marginTop: 12 }}
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
                </View>
            )}
        </>
    );
}

export default Products

const styles = StyleSheet.create({
    footer: { margin: 8 },
    root: { flex: 1, paddingVertical: 16 },
    searchContainer: {
        marginHorizontal: 8,
        // flexDirection: 'row',
    },
    textIput: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'grey',
        paddingHorizontal: 8,
        // flex: 1,
        // marginRight: 8,
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
})