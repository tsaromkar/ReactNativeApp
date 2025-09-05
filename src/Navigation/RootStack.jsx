import React from 'react'
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth';
import Home from '../Home';

const NativeStack = createNativeStackNavigator({
    initialRouteName: 'Login',
    screens: {
        Login,
        Home
    },
});

const Navigation = createStaticNavigation(NativeStack);

const RootStack = () => {
    return <Navigation />;
}

export default RootStack