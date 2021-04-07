import React from 'react'
import { View, Image } from 'react-native'

import Icon from '../../assets/images/profile-icon.jpg'
import globalStyles from '../utils/globalStyles'

const ProfileIcon = ({size, style, shadowed}) => {
    return (
        <View style={shadowed ? globalStyles.shadow : null} >
            <Image source={Icon} 
               style={[
                    {
                            width: size,
                            height: size,
                            borderRadius: 50
                    }, 
                    style
                ]} />
        </View>
    )
}
export default ProfileIcon