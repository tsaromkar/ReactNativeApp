import { ActivityIndicator, Button, FlatList, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Product from '../Components/Product';
import { useProducts } from './useProducts';
import CheckBox from '../Components/CheckBox';

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
        <View style={{ flex: 1, paddingVertical: 16 }}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textIput}
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={handleSearch}
                    placeholder="Search"
                />
            </View>
            {loading && !products?.length ? (
                <ActivityIndicator size="large" />
            ) : (
                <>
                    <View style={styles.checkboxContainer}>
                        {productTypes.map((filterItem) => {
                            return (
                                <View style={{ marginRight: 8 }} key={filterItem}>
                                    <CheckBox
                                        label={filterItem}
                                        checked={selectedFilters.has(filterItem.toLowerCase())}
                                        onChangeChecked={(item) => {
                                            const itemLowerCase = String(item.toLowerCase());
                                            setSelectedFilters(prev => {
                                                const newSet = new Set(prev);
                                                if (newSet.has(itemLowerCase)) {
                                                    newSet.delete(itemLowerCase);
                                                } else {
                                                    newSet.add(itemLowerCase)
                                                }
                                                return newSet;
                                            })
                                        }} />
                                </View>
                            )
                        })}
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
                </>
            )}
        </View>
    );
}

export default Products

const styles = StyleSheet.create({
    footer: { margin: 8 },
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
    checkboxContainer: {
        flexDirection: 'row',
        marginTop: 12,
        marginHorizontal: 12
    }
})