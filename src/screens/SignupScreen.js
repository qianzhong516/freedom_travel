import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AppScreen from '../components/AppScreen'
import BG from '../../assets/images/wave.jpg'
import SignupForm from '../components/SignupForm'
import SigninForm from '../components/SigninForm'
import axios from '../config/axios'

const Signup = ({navigation}) => {

    // Styles
    const {form} = styles
    const [showSigninForm, setShowSigninForm] = useState(false)

    const toggleForm = () => {
        setShowSigninForm(!showSigninForm)
    }

    const handleSignup = (values) => {
        console.log(values)
        const { email, name, password } = values
        const body = {
            user: { email, name, password }
        }
        axios.post('/users/signup', body).then((res) => {
            console.log(res)
            if(res.status === 200) {
                alert('Your account has been created!')
                toggleForm()
            }
        }).catch(err => {
            alert(err.response.data)
        })
    }

    const handleLogin = (values, actions) => {
        console.log(values)
        const body = {
            user: values
        }
        axios.post('/users/login', body).then(async (res) => {
            if(res.status === 200) {
                const token = res.data
                try {
                    await AsyncStorage.setItem('token', token)
                    // set global authorization header 
                    axios.defaults.headers['Authorization'] = token
                    actions.resetForm()
                    navigation.navigate('Profile')
                }catch(err) {
                    console.log('save token error: ', err)
                }
            }
        }).catch(err => {
            alert(err.response.data)
        })
    }

    return (
        <AppScreen bgImg={BG}>
            <View style={form}>
                {!showSigninForm && <SignupForm toggleForm={toggleForm}
                                                handleSubmit={handleSignup} />}
                {showSigninForm && <SigninForm toggleForm={toggleForm} 
                                               handleSubmit={handleLogin} />}
            </View>
        </AppScreen>
    )
}
    
const styles = StyleSheet.create({
    form: {
        marginTop: hp('15%'),
        backgroundColor: '#FFF',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
    },

})
export default Signup