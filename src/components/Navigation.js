import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignupForm from '../screens/SignupScreen'

const {Navigator, Screen} = createStackNavigator()

const Navigation = () => {
    return (
        <Navigator>
            <Screen name="Splash" component={SignupForm} options={{headerShown: false}} />
        </Navigator>
    )
}

export default Navigation