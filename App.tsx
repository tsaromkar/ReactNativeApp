/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Alert, Platform, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Toast from 'react-native-toast-message';
import RootStack from './src/Navigation/RootStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import messaging from "@react-native-firebase/messaging";
import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    // Request permission
    if (Platform.OS === "ios") {
      messaging()
        .requestPermission()
        .then(authStatus => {
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          if (enabled) {
            console.log("Authorization status:", authStatus);
          }
        });
    } else {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }

    // Get FCM token
    messaging()
      .getToken()
      .then(token => {
        console.log("FCM Token:", token);
        // Send this token to your backend to send notifications
      });

    // Foreground listener
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("New FCM message!", JSON.stringify(remoteMessage.notification));
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // When app opened from quit
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log("Opened from quit state:", remoteMessage.notification);
        }
      });

    // When app opened from background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("Opened from background:", remoteMessage.notification);
    });

    return unsubscribe;
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootStack />
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});

export default App;
