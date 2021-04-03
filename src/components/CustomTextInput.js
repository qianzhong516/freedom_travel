import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

import globalStyles from '../utils/globalStyles'

const CustomTextInput = ({...props}) => {
    
    // Styles
    const {input} = styles

    const [fontsLoaded] = useFonts({
        'Raleway': require('../../assets/fonts/Raleway-Regular.ttf')
    })

    if(!fontsLoaded) {
        return <AppLoading />
    }else {
        const fontStyles = {
            fontFamily: 'Raleway'
        }
        return (
            <TextInput {...props} style={[fontStyles, input]} />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: globalStyles.secondaryColor,
        paddingVertical: 8,
        color: "#FFF",
        width: wp('80%'),
        textAlign: 'center',
        fontSize: 17,
        marginVertical: 8,
        borderRadius: 4
    }
})
export default CustomTextInput