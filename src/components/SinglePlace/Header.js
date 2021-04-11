import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import CustomText from '../CustomText'
import globalStyles from '../../utils/globalStyles'

const Header = ({title, btn, onPress}) => {

    // Styles
    const { container, action, titleStyle } = styles

    return (
        <View style={container}>
            <CustomText style={titleStyle}>{title}</CustomText>
            <TouchableOpacity onPress={onPress}>
                <View style={action}>
                    <Icon name={btn.icon} size={20} color={globalStyles.textColor} />
                    <CustomText style={{color: globalStyles.textColor}}>{btn.title}</CustomText>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
    },
    titleStyle: {
        fontFamily: "RalewayBold",
        fontSize: 16,
        color: globalStyles.textColor
    },
    action: {
        flexDirection: "row"
    }
})
export default Header