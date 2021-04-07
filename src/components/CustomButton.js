import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import globalStyles from '../utils/globalStyles'

const CustomButton = ({title, style, width, height, type, ...props}) => {
    
    // Styles
    const {btn, text} = styles

    // Default values
    width = width ? width : wp('35%')
    height = height ? height : hp('5%')

    let defaultStyles = {
        width: width,
        height: height,
    }

    const dangerStyles = {
        backgroundColor: "#ED5454",
        borderColor: "#FFF"
    }

    const normalStyles = {
        backgroundColor: globalStyles.primaryColor,
        borderColor: globalStyles.secondaryColor
    }

    // Styles for type = danger
    if(type && type.toLowerCase()==="danger") {
        defaultStyles = {
            ...defaultStyles,
            ...dangerStyles
        }
    }else{
        defaultStyles = {
            ...defaultStyles,
            ...normalStyles
        }
    }

    return (
        <TouchableOpacity style={[defaultStyles, btn, style]} {...props}>
            <Text style={text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
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