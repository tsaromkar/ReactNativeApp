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
import { createRef, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = createRef();

  const navigate = (name, params) => {
    navigationRef.current?.navigate(name, params);
  }

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
      // Display local notification
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: "default",
          pressAction: { id: "default" },
        },
        data: remoteMessage.data, // keep custom data
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Listen for notification tap
    return notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log("Notification pressed:", detail.notification);
        const { screen, itemId } = detail.notification.data || {};
        if (screen) {
          navigate(screen, { itemId });
        }
      }
    });
  }, []);

  // 🔹 Background taps
  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const { screen, itemId } = remoteMessage.data || {};
      if (screen) navigate(screen, { itemId });
    });
    return unsubscribe;
  }, []);

  // 🔹 Quit state taps
  useEffect(() => {
    async function checkInitialNotification() {
      const remoteMessage = await messaging().getInitialNotification();
      if (remoteMessage) {
        const { screen, itemId } = remoteMessage.data || {};
        if (screen) navigate(screen, { itemId });
      }
    }
    checkInitialNotification();
  }, []);

  // Create notification channel on Android (required for >=8.0)
  useEffect(() => {
    async function createChannel() {
      await notifee.createChannel({
        id: "default",
        name: "Default Channel",
        importance: AndroidImportance.HIGH,
      });
    }
    createChannel();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootStack navigationRef={navigationRef} />
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
