import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import globalStyles from '../utils/globalStyles'

const CustomButton = ({title, style, width, height, ...props}) => {
    
    // Styles
    const {btn, text} = styles

    // Default values
    width = width ? wp(width) : wp('35%')
    height = height ? hp(height) : hp('5%')

    const defaultStyles = {
        width: width,
        height: height    
    }

    return (
        <TouchableOpacity style={[defaultStyles, btn, style]} {...props}>
            <Text style={text}>{title}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: globalStyles.primaryColor,
        borderColor: globalStyles.secondaryColor,
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: "Raleway",
        color: "#FFF"
    }
})
export default CustomButton