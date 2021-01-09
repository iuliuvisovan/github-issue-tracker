import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import store from './data/redux';

import useCachedResources from './ui/hooks/useCachedResources';
import Navigation from './ui/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <Navigation />
          <StatusBar style="dark" />
        </ReduxProvider>
      </SafeAreaProvider>
    );
  }
}
