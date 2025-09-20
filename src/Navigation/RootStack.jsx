import React from 'react'
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth';
import Home from '../Home';
import Products from '../Products';
import Pagination from '../Products/Pagination';

const NativeStack = createNativeStackNavigator({
    initialRouteName: 'Pagination',
    screens: {
        Login,
        Home,
        Products,
        Pagination
    },
});

const Navigation = createStaticNavigation(NativeStack);

const RootStack = () => {
    return <Navigation />;
}

export default RootStack