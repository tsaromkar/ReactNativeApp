import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth';
import Home from '../Home';
import Products from '../Products';
import Pagination from '../Products/Pagination';
import useAuthContext from '@contexts/hooks/useAuthContext';

const NativeStack = createNativeStackNavigator();

const RootStack = () => {
    const { tokens } = useAuthContext();

    return (
        <NativeStack.Navigator>
            {!tokens ?
                <NativeStack.Group>
                    <NativeStack.Screen name="Login" component={Login} />
                </NativeStack.Group>
                :
                <NativeStack.Group>
                    <NativeStack.Screen name="Home" component={Home} />
                    <NativeStack.Screen name="Products" component={Products} />
                    <NativeStack.Screen name="Pagination" component={Pagination} />
                </NativeStack.Group>
            }
        </NativeStack.Navigator>
    )
}

export default RootStack