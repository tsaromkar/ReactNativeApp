import { StyleSheet, View } from 'react-native'
import React from 'react'
import CheckBox from '@components/CheckBox'

const Filters = ({ productTypes, selectedFilters, setSelectedFilters }) => {
    if (!productTypes) return null;
    return (
        <View style={styles.checkboxContainer}>
            {productTypes.map((filterItem) => {
                return (
                    <View style={styles.checkboxItem} key={filterItem}>
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
    )
}

export default Filters

const styles = StyleSheet.create({
    checkboxItem: {
        marginRight: 8
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginHorizontal: 12
    },
})