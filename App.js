import { useCallback, useEffect, useState, useRef } from "react";
import { Vibration, Platform } from 'react-native';
import { useFonts } from 'expo-font';

import AppNavigator from './navigation/AppNavigator';
import { UserProvider } from './UserContext'; 

const App = () => {

  const [loaded] = useFonts({
    "DMBold": require('./assets/fonts/DMSans-Bold.ttf'),
    "DMMedium": require('./assets/fonts/DMSans-Medium.ttf'),
    "DMRegular": require('./assets/fonts/DMSans-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
  
};

export default App;
