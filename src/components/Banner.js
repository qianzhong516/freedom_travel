import React from 'react'
import { StyleSheet, ImageBackground, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import globalStyles from '../utils/globalStyles'
import CustomText from './CustomText'
import BG from '../../assets/images/hotel.png'

const Banner = ({title}) => {

    // Styles
    const { bg1, bg1_inner, top, top_text, bottom, bottomText, author, date, bg, text } = styles

    const route = useRoute()

    if(route.name === "Single Place") {
        return (
            <ImageBackground source={BG} style={bg1}>
                <View style={bg1_inner}>
                    <View style={{ padding: 16 }}>
                        <View style={top}>
                            <CustomText style={top_text}>{title}</CustomText>
                            <Icon name="share" size={25} color="#FFF" />
                        </View>
                        <View style={bottom}>
                            <CustomText style={[author, bottomText]}>Janice Zhong</CustomText>
                            <View style={date}>
                                <Icon name="calendar-blank" size={20} color="#FFF" />
                                <CustomText style={bottomText}> 21/03/2021</CustomText>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }else{ 
        return (
            <ImageBackground style={bg}>
                <CustomText style={text}>{title}</CustomText>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    bg1: {
        width: "100%",
        height: 115,
        resizeMode: "cover"
    },
    bg1_inner: { 
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },  
    top_text: {
        color: "#FFF",
        fontSize: 20,
        textTransform: "uppercase"
    },
    bottom: {
        alignItems: "flex-end",
        marginTop: 16
    },
    bottomText: {
        color: "#FFF"
    },
    author: {
        marginBottom: 2
    },
    date: {
        flexDirection: "row",
        justifyContent: "center",
        color: "#FFF"
    },  
    bg: {
        width: "100%",
        height: 100,
        backgroundColor: globalStyles.primaryColor,
        paddingHorizontal: 16,
        justifyContent: 'center',
        marginBottom: 16
    },
    text: {
        fontFamily: "RalewayBold",
        color: "#FFF",
        fontSize: 20,
        textTransform: "capitalize"
    }
})
export default Banner