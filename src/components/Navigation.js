import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SplashScreen from './SplashScreen'
const {Navigator, Screen} = createStackNavigator()

const Navigation = () => {
    return (
        <Navigator>
            <Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
        </Navigator>
    )
}

export default Navigation