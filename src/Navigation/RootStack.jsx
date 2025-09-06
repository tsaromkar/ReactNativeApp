import React from 'react'
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth';
import Home from '../Home';
import Products from '../Products';

const NativeStack = createNativeStackNavigator({
    initialRouteName: 'Login',
    screens: {
        Login,
        Home,
        Products
    },
});

const Navigation = createStaticNavigation(NativeStack);

const RootStack = () => {
    return <Navigation />;
}

export default RootStack