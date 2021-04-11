import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import CustomText from './CustomText'

const CityCard = ({ source, title, onPress }) => {

    // Styles
    const {outer, inner, text} = styles

    return (
        <TouchableWithoutFeedback onPress={onPress} >
            <ImageBackground source={source} style={outer} >
                <View style={inner} >
                    <CustomText style={text}  >{ title }</CustomText>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    outer: {
        width: "100%",
        height: 180,
        marginBottom: 16
    },
    inner: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontFamily: "RalewayBold",
        color: "#FFF",
        fontSize: 24,
        textTransform: "uppercase"
    }
})
export default CityCard