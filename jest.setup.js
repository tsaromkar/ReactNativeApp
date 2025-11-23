/* eslint-env jest */
// @env is mocked via moduleNameMapper in jest.config.js

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Firebase
jest.mock('@react-native-firebase/app', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        utils: jest.fn(),
    })),
}));

jest.mock('@react-native-firebase/messaging', () => {
    const mockMessaging = jest.fn(() => ({
        getToken: jest.fn(() => Promise.resolve('mock-token')),
        requestPermission: jest.fn(() => Promise.resolve(1)),
        onMessage: jest.fn(() => jest.fn()),
        onNotificationOpenedApp: jest.fn(() => jest.fn()),
        getInitialNotification: jest.fn(() => Promise.resolve(null)),
    }));

    mockMessaging.AuthorizationStatus = {
        NOT_DETERMINED: 0,
        DENIED: 1,
        AUTHORIZED: 2,
        PROVISIONAL: 3,
    };

    return {
        __esModule: true,
        default: mockMessaging,
    };
});

// Mock react-native-toast-message
jest.mock('react-native-toast-message', () => {
    const React = require('react');
    const { View } = require('react-native');
    const ToastComponent = () => React.createElement(View, { testID: 'toast' });
    ToastComponent.show = jest.fn();
    ToastComponent.hide = jest.fn();
    return {
        __esModule: true,
        default: ToastComponent,
    };
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
        __esModule: true,
        default: {
            GestureHandlerRootView: ({ children }) => React.createElement(View, {}, children),
        },
        GestureHandlerRootView: ({ children }) => React.createElement(View, {}, children),
        Swipeable: View,
        DrawerLayout: View,
        State: {},
        ScrollView: View,
        Slider: View,
        Switch: View,
        TextInput: View,
        ToolbarAndroid: View,
        ViewPagerAndroid: View,
        DrawerLayoutAndroid: View,
        WebView: View,
        NativeViewGestureHandler: View,
        TapGestureHandler: View,
        ForceTouchGestureHandler: View,
        LongPressGestureHandler: View,
        PanGestureHandler: View,
        PinchGestureHandler: View,
        RotationGestureHandler: View,
        FlingGestureHandler: View,
        RawButton: View,
        BaseButton: View,
        BorderlessButton: View,
        FlatList: View,
        gestureHandlerRootHOC: jest.fn((component) => component),
        Directions: {},
    };
});

// Mock @notifee/react-native
jest.mock('@notifee/react-native', () => ({
    __esModule: true,
    default: {
        createChannel: jest.fn(() => Promise.resolve('channel-id')),
        displayNotification: jest.fn(() => Promise.resolve()),
        onForegroundEvent: jest.fn(() => jest.fn()),
        onBackgroundEvent: jest.fn(() => jest.fn()),
        getInitialNotification: jest.fn(() => Promise.resolve(null)),
        cancelNotification: jest.fn(() => Promise.resolve()),
        cancelAllNotifications: jest.fn(() => Promise.resolve()),
        requestPermission: jest.fn(() => Promise.resolve({ authorizationStatus: 1 })),
    },
    AndroidImportance: {
        DEFAULT: 3,
        HIGH: 4,
        LOW: 2,
        MIN: 1,
        NONE: 0,
    },
    EventType: {
        DELIVERED: 1,
        DISMISSED: 2,
        PRESS: 3,
        ACTION_PRESS: 4,
    },
}));

// Mock AuthContext
const mockSetTokens = jest.fn();
const mockAuthContextValue = {
    tokens: null,
    setTokens: mockSetTokens,
};

jest.mock('@contexts/contexts/AuthContext', () => {
    const React = require('react');
    const { createContext } = React;
    const AuthContext = createContext(mockAuthContextValue);

    return {
        AuthContext,
        AuthProvider: ({ children }) => React.createElement(AuthContext.Provider, { value: mockAuthContextValue }, children),
        getGlobalSetTokens: () => mockSetTokens,
    };
});

