import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useAuthContext from '@contexts/hooks/useAuthContext';
import { Login } from '@screens/Auth';
import { Home } from '@screens/Home';
import { Pagination, Products } from '@screens/Products';
import { Animations } from '@screens/Animations';
import { WidthAnimation } from '@screens/Animations';
import { TransformAnimation } from '@screens/Animations';
import { AnimatedProps } from '@screens/Animations';

const NativeStack = createNativeStackNavigator();

const RootStack = () => {
    const { tokens } = useAuthContext();

    return (
        <NativeStack.Navigator>
            {!tokens ?
                <>
                    <NativeStack.Group>
                        <NativeStack.Screen name="Animations" component={Animations} />
                        <NativeStack.Screen name="WidthAnimation" component={WidthAnimation} />
                        <NativeStack.Screen name="TransformAnimation" component={TransformAnimation} />
                        <NativeStack.Screen name="AnimatedProps" component={AnimatedProps} />
                    </NativeStack.Group>
                    <NativeStack.Group>
                        <NativeStack.Screen name="Login" component={Login} />
                    </NativeStack.Group>
                </>
                :
                <NativeStack.Group>
                    <NativeStack.Screen name="Home" component={Home} />
                    <NativeStack.Screen name="Products" component={Products} />
                    <NativeStack.Screen name="Pagination" component={Pagination} />
                    {/* <NativeStack.Screen name="Animations" component={Animations} /> */}
                </NativeStack.Group>
            }
        </NativeStack.Navigator>
    )
}

export default RootStack