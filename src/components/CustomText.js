import React from 'react'
import { Text, StyleSheet } from 'react-native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'

const CustomText = ({children, style}) => {
    
    // Load custom font
    const [fontsLoaded] = useFonts({
        'Raleway': require('../../assets/fonts/Raleway-Regular.ttf')
    })

    if(!fontsLoaded) {
        return <AppLoading />
    }else{
        const fontStyles = {
            fontFamily: 'Raleway'
        }
        return (
            <Text style={style ? [fontStyles, style] : fontStyles}>{children}</Text>
        )
    }
}

const styles = StyleSheet.create({})

export default CustomText