import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useAuthContext from '@contexts/hooks/useAuthContext';
import { Login } from '@screens/Auth';
import { Home } from '@screens/Home';
import { Pagination, Products } from '@screens/Products';

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