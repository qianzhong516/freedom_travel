import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

import globalStyles from '../utils/globalStyles'

const Header = () => {

    // Styles
    const {iconContainer, header} = styles

    // Access navigation globally
    const navigation = useNavigation()

    const handlePress = () => {
        navigation.goBack()
    }

    return (
        <View style={header} >
            <View style={iconContainer}>
                <Icon name="arrow-left" size={25} color="#FFF" onPress={handlePress} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        backgroundColor: "#FFF",
        paddingHorizontal: 16,
        height: 46,
        justifyContent: 'center'
    },
    iconContainer: {
        width: 30,
        height: 30,
        backgroundColor: globalStyles.primaryColor,
        borderWidth: 1,
        borderColor: globalStyles.secondaryColor,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Header