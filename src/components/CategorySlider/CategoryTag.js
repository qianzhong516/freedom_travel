import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import globalStyles from '../../utils/globalStyles'
import CustomText from '../CustomText'

const CategoryTag = ({title, icon, onPress}) => {

    // Styles
    const { container, text } = styles 

    return (
        <TouchableOpacity style={container} onPress={() => onPress(title)}>
            {icon}
            <CustomText style={text}>{title}</CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginHorizontal: 6
    },
    text: {
        color: globalStyles.textColor
    }
})
export default CategoryTag