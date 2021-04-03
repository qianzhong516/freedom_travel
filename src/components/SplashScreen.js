import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import Logo from '../../assets/images/logo-square.png'
import AppScreen from './AppScreen';

const SplashScreen = () => {

    // Styles
    const {logoContainer, logo, footer} = styles

    return (
        <AppScreen>
            <View style={logoContainer}>
                <Image source={Logo} style={logo} />
            </View>
            <View style={footer}>
                <Text>© Freedom copyright 2021.</Text>
            </View>
        </AppScreen>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 236,
        height: 236
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
})

export default SplashScreen