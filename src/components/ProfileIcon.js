import React from 'react'
import { Image } from 'react-native'

const ProfileIcon = ({source, size}) => {
    return (
        <Image source={source} 
               style={{
                   width: size,
                   height: size,
                   borderRadius: 50
               }} />
    )
}
export default ProfileIcon