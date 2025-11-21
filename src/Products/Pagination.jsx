import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
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
                {!!products?.length && <View style={styles.paginationContainer}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                        <Pressable
                            key={num}
                            onPress={() => setPage(num)}
                            disabled={page === num}
                            style={[
                                styles.paginationButton,
                                page === num ? styles.paginationButtonActive : styles.paginationButtonInactive
                            ]}>
                            <Text style={styles.paginationButtonText}>{num.toString()}</Text>
                        </Pressable>
                    ))}
                </View>}
            </View>
        </>
    );
}

export default Pagination

const styles = StyleSheet.create({
    root: { flex: 1, paddingVertical: 16 },
    header: { gap: 8, marginBottom: 8 },
    textIput: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'grey',
        paddingHorizontal: 8,
        marginHorizontal: 8,
        minHeight: 40
    },
    activityIndContianer: { flex: 1, justifyContent: "center", alignItems: "center" },
    flatList: { flex: 1 },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 4
    },
    paginationButton: {
        padding: 10
    },
    paginationButtonActive: {
        backgroundColor: "#ccc"
    },
    paginationButtonInactive: {
        backgroundColor: "green"
    },
    paginationButtonText: {
        color: "white"
    }
})