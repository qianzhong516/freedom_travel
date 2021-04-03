import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/SignupScreen'

const {Navigator, Screen} = createStackNavigator()

const Navigation = () => {
    return (
        <Navigator>
            <Screen name="Signup" component={Home} options={{headerShown: false}} />
        </Navigator>
    )
}

export default Navigation