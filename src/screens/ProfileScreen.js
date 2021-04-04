import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import Bg from '../../assets/images/profile-bg.jpg'
import Icon from '../../assets/images/profile-icon.jpg'
import ProfileIcon from '../components/ProfileIcon'
import CustomText from '../components/CustomText'
import CustomButton from '../components/CustomButton'

const ProfileScreen = () => {

    // Styles
    const { bg, iconContainer, btnsContainer, title, btn } = styles

    return (
        <View>
            <Image source={Bg} style={bg} />
            <View style={iconContainer}>
                <ProfileIcon source={Icon} size={86} />
                <CustomText style={title}>Janice Zhong</CustomText>
                <CustomText>qian.zhong1@students.mq.edu.au</CustomText>
            </View>
            <View style={btnsContainer}>
                <CustomButton title="Reset Password"
                              width="50"
                              height="6"
                              style={btn} />
                <CustomButton title="Upload Profile Icon"
                              width="50"
                              height="6"
                              style={btn} />
                <CustomButton title="Log Out" 
                              width="50"
                              height="6"
                              style={btn} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bg: {
        width:"100%",
        height: 160
    },
    title: {
        fontSize: 18,
        marginTop: 10
    },
    btn: {
        marginBottom: 24
    },
    iconContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: -43
    },
    btnsContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 50
    }
})
export default ProfileScreen