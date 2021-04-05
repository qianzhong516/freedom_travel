import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'

const AppScreen = ({children, bgImg, innerStyle, ...props}) => {
    
    // Styles
    const {container, img} = styles

    return (
        <View style={container} {...props}>
            {bgImg ? <ImageBackground source={bgImg} style={img}>
                        <View style={{ paddingHorizontal: 16 }}>{children}</View>
                      </ImageBackground> : 
                      <View style={innerStyle}>{children}</View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        flex: 1,
        resizeMode: 'cover'
    }
})
export default AppScreen