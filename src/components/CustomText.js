import React from 'react'
import { Text } from 'react-native'

const CustomText = ({children, style, underline, ...props}) => {

    const styles = [{ fontFamily: 'Raleway' }]

    if(style) {
        styles.push(style)
    }
    if(underline) {
        styles.push({ textDecorationLine: 'underline' })
    }

    return (
        <Text style={styles} {...props}>{children}</Text>
    )
    
}

export default CustomText