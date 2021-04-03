import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import globalStyles from '../utils/globalStyles'

const CustomButton = ({title, style, ...props}) => {
    
    // Styles
    const {btn, text} = styles

    return (
        <TouchableOpacity style={[btn, style]} {...props}>
            <Text style={text}>{title}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    btn: {
        width: wp('35%'),
        height: hp('5%'),
        backgroundColor: globalStyles.primaryColor,
        borderColor: globalStyles.secondaryColor,
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "#FFF"
    }
})
export default CustomButton