import React from 'react'
import { View, StyleSheet } from 'react-native'

import CustomText from '../CustomText'
import globalStyles from '../../utils/globalStyles'

const Introduction = ({content}) => {

    // Styles
    const { container, text, title } = styles

    return (
        <View style={container}>
            <CustomText style={title}>Introduction</CustomText>
            <CustomText style={text}>{content}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24
    },
    text: {
        fontSize: 14,
        color: globalStyles.textColor,
        textAlign: "justify"
    },
    title: {
        fontSize: 16,
        color: globalStyles.textColor,
        marginBottom: 5
    }
})
export default Introduction