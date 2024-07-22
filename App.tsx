import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, Text, View } from 'react-native';
import theme from './utils/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { SWRConfig } from 'swr';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SWRConfig
          value={{
            provider: () => new Map(),
            isVisible: () => true,
            initFocus: (callback) => {
              let appState = AppState.currentState;

              const onAppStateChange = (nextAppState: any) => {
                if (appState.match(/inactive|background/) && nextAppState === 'active') {
                  callback();
                }
                appState = nextAppState;
              };

              const subscription = AppState.addEventListener('change', onAppStateChange);

              return () => {
                subscription.remove();
              };
            },
          }}
        >
          <Navigation />
        </SWRConfig>
        <StatusBar translucent />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}


