import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Bg from '../../assets/images/profile-bg.jpg'
import ProfileIcon from '../components/ProfileIcon'
import CustomText from '../components/CustomText'
import CustomButton from '../components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../config/axios'

const ProfileScreen = () => {

    // Styles
    const { bg, iconContainer, btnsContainer, title, btn } = styles
    const navigation = useNavigation()
    const [user, setUser] = useState({
        name: "",
        email: ""
    })

    useEffect(() => {
        axios.get('/users/current-user').then((res) => {
            setUser(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token')
            navigation.navigate('Signup')
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <View>
            <Image source={Bg} style={bg} />
            <View style={iconContainer}>
                <ProfileIcon size={86} shadowed />
                <CustomText style={title}>{user.name}</CustomText>
                <CustomText>{user.email}</CustomText>
            </View>
            <View style={btnsContainer}>
                <CustomButton title="Reset Password"
                              width="50%"
                              height="13%"
                              style={btn} />
                <CustomButton title="Upload Profile Icon"
                              width="50%"
                              height="13%"
                              style={btn} />
                <CustomButton title="Log Out" 
                              width="50%"
                              height="13%"
                              style={btn}
                              onPress={handleLogout} />
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