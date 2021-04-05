import React from 'react'
import { View, StyleSheet } from 'react-native'

import globalStyles from '../../utils/globalStyles'
import CustomText from '../CustomText'

const CategoryTag = ({title, icon}) => {

    // Styles
    const { container, text } = styles 

    return (
        <View style={container}>
            {icon}
            <CustomText style={text}>{title}</CustomText>
        </View>
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