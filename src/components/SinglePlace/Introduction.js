import React from 'react'
import { View, StyleSheet } from 'react-native'

import CustomText from '../CustomText'
import Header from './Header'
import globalStyles from '../../utils/globalStyles'

const Introduction = ({content}) => {

    // Styles
    const { container, text } = styles

    const btn = {
        icon: "lead-pencil",
        title: "edit"
    }
    return (
        <View style={container}>
            <Header title="Introduction" btn={btn}/>
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
    }
})
export default Introduction