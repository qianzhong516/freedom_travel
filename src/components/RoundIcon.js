import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import globalStyles from '../utils/globalStyles'

const RoundIcon = ({size=25, name, onPress, shadowed}) => {

    // Styles
    const {iconContainer} = styles
    let defaultStyles = {
        width: size+10,
        height: size+10
    }

    if(shadowed)
        defaultStyles = {...defaultStyles, ...globalStyles.shadow}

    return (
        <View style={[defaultStyles, iconContainer]}>
            <Icon name={name} 
                  size={size} 
                  color="#FFF" 
                  onPress={onPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: globalStyles.primaryColor,
        borderWidth: 1,
        borderColor: globalStyles.secondaryColor,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default RoundIcon