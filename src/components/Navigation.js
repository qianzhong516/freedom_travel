import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import SignupScreen from '../screens/SignupScreen'
import TabNavigation from './TabNavigation'
import { useEffect } from 'react'
import axios from '../config/axios'

const {Navigator, Screen} = createStackNavigator()

const Navigation = () => {

    const [auth, setAuth] = useState() 
    
    // check user auth
    useEffect(() => {
        async function getToken() {
            try{ 
                const token = await AsyncStorage.getItem('token')
                console.log('token in local storage: ', token)
                // set global authorization header 
                axios.defaults.headers['Authorization'] = 'Bearer '+token
                setAuth(token)
            }catch(err) {
                console.log(err)
            }
        }
        getToken()
    }, [])
    
    return (
        <Navigator>
            {!auth && <Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />}
            <Screen name="Profile" component={TabNavigation} options={{headerShown: false}} />
        </Navigator>
    )
}

export default Navigation