import React from 'react'
import { View, StyleSheet } from 'react-native'

import globalStyles from '../utils/globalStyles'
import CustomText from './CustomText'

const PlaceTag = ({title}) => {
    
    // Styles
    const { tag, tagTitle } = styles

    return (
        <View style={tag}>
            <CustomText style={tagTitle} >{title}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    tag: {
        flexDirection: "column",
        justifyContent: "center",
        height: 25,
        backgroundColor: globalStyles.secondaryColor,
        borderWidth: 1,
        borderColor: globalStyles.textColor,
        borderRadius: 4,
        paddingHorizontal: 5
    },
    tagTitle: {
        color: globalStyles.textColor,
        fontSize: 12
    }
})
export default PlaceTag