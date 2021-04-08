import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import Banner from '../components/Banner'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import CustomText from '../components/CustomText'
import DropdownSelect from '../components/DropdownSelect/DropdownSelect'
import Header from '../components/Header'
import SectionHeader from '../components/SinglePlace/Header'
import globalStyles from '../utils/globalStyles'

const AddListingScreen = ({navigation}) => {

    // Styles 
    const { container, formGroup, titleStyle, btns, gallery, photoView, controlTxt, photoImg, photoControl } = styles

    const cities = [
        {
            id: "1",
            option: "city 1"
        },
        {
            id: "2",
            option: "city 2"
        }
    ]

    const btn = {
        icon: "arrow-up",
        title: "upload photos"
    }
    
    // Fetched gallery images from database
    const [images, setImages] = useState([
        { uri: 'http://i.imgur.com/XP2BE7q.jpg', id: "0" },
        { uri: 'http://i.imgur.com/XP2BE7q.jpg', id: "1" },
        { uri: 'http://i.imgur.com/5nltiUd.jpg', id: "2" },
        { uri: 'http://i.imgur.com/6vOahbP.jpg', id: "3" },
        { uri: 'http://i.imgur.com/kj5VXtG.jpg', id: "4" }
    ])

    const tabBarHeight = useBottomTabBarHeight()
    const [fromFields, setFormFields] = useState({
        city: "",
        intro: "",
        phone: "",
        email: "",
        website: "",
        address: "",
        gallery: []
    })

    const handleFormChanges = (value, label) => {
        setFormFields({
            ...fromFields,
            [label]: value
        })
    }

    const handleDelete = (id) => {
        const updated = images.filter(img => img.id !== id)
        setImages(updated)
    }

    const handleCancel = () => {
        navigation.goBack()
    }

    const SinglePhoto = ({img}) => (
        <View style={photoView}>
            <Image source={{uri: img.uri}} style={photoImg} />
            <TouchableOpacity style={photoControl} onPress={() => handleDelete(img.id)}>
                <CustomText style={controlTxt}>X</CustomText>
            </TouchableOpacity>
        </View>
    )

    return (
        <>
            <Header />
            <Banner title="Add New Listing" />
            <ScrollView style={container}>
                <View style={formGroup}>
                    <CustomText style={titleStyle}>Category</CustomText>
                    <DropdownSelect data={cities}
                                    defaultOption="Select A City"
                                    value={fromFields['city']}
                                    color={globalStyles.textColor}
                                    handleChange={(value) => handleFormChanges(value, 'city')} />
                </View>
                <View style={formGroup}>
                    <CustomText style={titleStyle}>Introduction</CustomText>
                    <CustomInput  width="100%"
                                  height={100}
                                  placeholder="Enter introduction here"
                                  value={fromFields['intro']}
                                  onChangeText={(value) => handleFormChanges(value, 'intro')}
                                  type="textarea" />
                </View>
                <View style={formGroup}>
                    <CustomText style={titleStyle}>Contact Info</CustomText>
                    <View style={{ flexDirection: "row", marginBottom: 8, justifyContent: "space-between" }}>
                        <CustomInput  width="49%"
                                      placeholder="Phone"
                                      keyboardType="number-pad"
                                      value={fromFields['phone']}
                                      onChangeText={(value) => handleFormChanges(value, 'phone')} />
                        <CustomInput  width="49%"
                                      placeholder="Email"
                                      keyboardType="email-address"
                                      value={fromFields['email']}
                                      onChangeText={(value) => handleFormChanges(value, 'email')} />
                    </View>
                    <View>
                        <CustomInput  width="100%"
                                      placeholder="Website"
                                      value={fromFields['website']}
                                      onChangeText={(value) => handleFormChanges(value, 'website')}
                                      autoCapitalize="none" />
                    </View>
                </View>
                <View style={formGroup}>
                    <CustomText style={titleStyle}>Address</CustomText>
                    <CustomInput  width="100%"
                                  placeholder="Enter address here"
                                  value={fromFields['address']}
                                  onChangeText={(value) => handleFormChanges(value, 'address')} />
                </View>
                <View style={formGroup}>
                    <SectionHeader title="Gallery" btn={btn} />
                    <View style={gallery}>
                        {images.length ? images.map(img => <SinglePhoto key={img.id} img={img} />) :
                                            <CustomText style={{ color: globalStyles.textColor }}>
                                                There is no image in this gallery yet...
                                            </CustomText>}
                    </View>
                </View>
                <View style={[btns, { marginBottom: tabBarHeight + 32 }]}>
                    <CustomButton title="Cancel"
                                  type="danger"
                                  width="49%"
                                  onPress={handleCancel} />
                    <CustomButton title="Confirm"
                                  width="49%"/>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    formGroup: {
        marginBottom: 16
    },
    titleStyle: {
        fontSize: 16,
        marginBottom: 8
    },
    btns: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    gallery: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start"
    },
    photoView: {
        position: "relative",
        marginHorizontal: 2.5,
        marginBottom: 8
    },
    photoControl: {
        position: "absolute",
        top: 4,
        right: 4,
        width: 24,
        height: 24,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: globalStyles.dangerColor
    },
    controlTxt: {
        color: "#FFF"
    },
    photoImg: {
        flex: 1,
        width: 85,
        height: 85,
        resizeMode: "cover"
    }
})
export default AddListingScreen