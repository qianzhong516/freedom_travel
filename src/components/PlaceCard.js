import React from 'react'
import { View, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native'

import CustomText from './CustomText'
import ProfileIcon from './ProfileIcon'
import PlaceTag from './PlaceTag'
import globalStyles from '../utils/globalStyles'

const PlaceCard = ({img, tag, title, onPress}) => {

    // Styles
    const {container, imgStyle, icon, infoContainer, titleStyle} = styles

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={container}>
                <ImageBackground source={img} style={imgStyle}>
                    <ProfileIcon size={42} style={icon} shadowed />
                </ImageBackground>
                <View style={infoContainer}>
                    <CustomText style={titleStyle}>{title}</CustomText>
                    <PlaceTag title={tag} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    imgStyle: {
        width: "100%",
        height: 150,
        alignItems: "flex-end",
    },
    icon: {
        marginTop: 10,
        marginRight: 10
    },
    infoContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: 8,
        marginTop: -12
    },
    titleStyle: {
        flexDirection: "column",
        justifyContent: "center",
        height: 25,
        fontSize: 16,
        color: globalStyles.textColor
    }
})
export default PlaceCard