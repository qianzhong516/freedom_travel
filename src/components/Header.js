import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import RoundIcon from './RoundIcon'

const Header = () => {

    // Styles
    const {header} = styles

    // Access navigation globally
    const navigation = useNavigation()

    const handlePress = () => {
        navigation.goBack()
    }

    return (
        <View style={header} >
            <RoundIcon name="arrow-left" size={25} color="#FFF" onPress={handlePress} /> 
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
    }
})

export default Header