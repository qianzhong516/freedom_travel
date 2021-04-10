import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignupScreen from '../screens/SignupScreen'
import TabNavigation from './TabNavigation'

const {Navigator, Screen} = createStackNavigator()

const Navigation = () => {

    return (
        <Navigator>
            <Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
            <Screen name="Profile" component={TabNavigation} options={{headerShown: false}} />     
        </Navigator>
    )
}

export default Navigation