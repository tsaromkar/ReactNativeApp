import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth';
import Home from '../Home';
import Products from '../Products';
import Pagination from '../Products/Pagination';

const NativeStack = createNativeStackNavigator();

const LINKING = {
    prefixes: ["reactnativeapp://", "https://reactnativeapp.com"], // prefixes you’ll support
    config: {
        screens: {
            Home: "home",
            Products: "products",
        },
    },
};

const RootStack = ({ navigationRef }) => {
    return (
        <NavigationContainer ref={navigationRef} linking={LINKING}>
            <NativeStack.Navigator initialRouteName="Login">
                <NativeStack.Screen name="Login" component={Login} />
                <NativeStack.Screen name="Home" component={Home} />
                <NativeStack.Screen name="Products" component={Products} />
                <NativeStack.Screen name="Pagination" component={Pagination} />
            </NativeStack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack