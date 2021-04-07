import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import CustomText from '../CustomText'
import globalStyles from '../../utils/globalStyles'

const ContactIcon = ({icon, title, size=25 }) => {
    return (
        <View style={styles.container}>
            <Icon name={icon} size={size} color={globalStyles.textColor} />
            <CustomText style={styles.green} >{title}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: "32%",
        alignItems: "center"
    },
    green: {
        color: globalStyles.textColor
    }
})
export default ContactIcon