import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'

import Navigation from './src/components/Navigation'

export default function App() {
  // Load custom font
  const [fontsLoaded] = useFonts({
      'Raleway': require('./assets/fonts/Raleway-Regular.ttf')
  })
  if(!fontsLoaded) {
    return <AppLoading />
  }else {
    return (
      <NavigationContainer>
          <Navigation />
      </NavigationContainer>
    )
  }

}

