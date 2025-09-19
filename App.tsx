/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Platform, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Toast from 'react-native-toast-message';
import RootStack from './src/Navigation/RootStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

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
