import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import AppScreen from '../components/AppScreen'
import BG from '../../assets/images/wave.jpg'
import SignupForm from '../components/SignupForm'
import SigninForm from '../components/SigninForm'

const Signup = () => {

    // Styles
    const {form} = styles
    const [showSigninForm, setShowSigninForm] = useState(false)

    const toggleForm = () => {
        setShowSigninForm(!showSigninForm)
    }
    return (
        <AppScreen bgImg={BG}>
            <View style={form}>
                {!showSigninForm && <SignupForm toggleForm={toggleForm} />}
                {showSigninForm && <SigninForm toggleForm={toggleForm} />}
            </View>
        </AppScreen>
    )
}
    
const styles = StyleSheet.create({
    form: {
        marginTop: hp('20%'),
        backgroundColor: '#FFF',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
    },

})
export default Signup