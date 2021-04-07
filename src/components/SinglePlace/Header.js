import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import CustomText from '../CustomText'
import globalStyles from '../../utils/globalStyles'

const Header = ({title, btn}) => {

    // Styles
    const { container, action, titleStyle } = styles

    return (
        <View style={container}>
            <CustomText style={titleStyle}>{title}</CustomText>
            <View style={action}>
                <Icon name={btn.icon} size={20} color={globalStyles.textColor} />
                <CustomText style={{color: globalStyles.textColor}}>{btn.title}</CustomText>
            </View>
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
        fontSize: 16,
        color: globalStyles.textColor
    },
    action: {
        flexDirection: "row"
    }
})
export default Header