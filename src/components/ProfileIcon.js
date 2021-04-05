import React from 'react'
import { Image } from 'react-native'

import Icon from '../../assets/images/profile-icon.jpg'

const ProfileIcon = ({size, style}) => {
    return (
        <Image source={Icon} 
               style={[{
                   width: size,
                   height: size,
                   borderRadius: 50
               }, style]} />
    )
}
export default ProfileIcon