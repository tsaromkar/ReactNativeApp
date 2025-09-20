import { ActivityIndicator, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Product from '@components/Product';
import Filters from './Filters';
import { usePagination } from './usePagination';

const Pagination = () => {
    const {
        products,
        page,
        setPage,
        totalPages,
        loading,
        search,
        setSearch,
        handleSearch,
        selectedFilters,
        setSelectedFilters,
        productTypes,
    } = usePagination();

    const renderHeader = () => {
        return (
            <View style={styles.header}>
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
            <View style={styles.root}>
                {renderHeader()}
                {loading ?
                    <View style={styles.activityIndContianer}>
                        <ActivityIndicator size="large" />
                    </View> :
                    !products?.length ?
                        <View style={styles.activityIndContianer}>
                            <Text>No Products Found</Text>
                        </View>
                        : <FlatList
                            style={styles.flatList}
                            data={products}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Product product={item} />
                            )}
                        />}
                {!!products?.length && <View style={{ flexDirection: "row", justifyContent: "center", gap: 4 }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                        <Pressable
                            key={num}
                            onPress={() => setPage(num)}
                            disabled={page === num}
                            style={{
                                padding: 10,
                                backgroundColor: page === num ? "#ccc" : "green"
                            }}>
                            <Text style={{ color: "white" }}>{num.toString()}</Text>
                        </Pressable>
                    ))}
                </View>}
            </View>
        </>
    );
}

export default Pagination

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
        minHeight: 40
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
    activityIndContianer: { flex: 1, justifyContent: "center", alignItems: "center" },
    text: { fontWeight: "700", color: "#333", fontSize: 16, marginHorizontal: 16 },
    flatList: { flex: 1 }
})