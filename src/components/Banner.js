import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'

import globalStyles from '../utils/globalStyles'
import CustomText from './CustomText'

const Banner = ({title}) => {

    // Styles
    const { imgbg, text } = styles

    return (
        <ImageBackground style={imgbg}>
            <CustomText style={text}>{title}</CustomText>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imgbg: {
        width: "100%",
        height: 100,
        backgroundColor: globalStyles.primaryColor,
        paddingHorizontal: 16,
        justifyContent: 'center',
        marginBottom: 16
    },
    text: {
        color: "#FFF",
        fontSize: 20
    }
})
export default Banner