import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import * as FileSystem from 'expo-file-system'

import Banner from '../components/Banner'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import CustomText from '../components/CustomText'
import DropdownSelect from '../components/DropdownSelect/DropdownSelect'
import Header from '../components/Header'
import SectionHeader from '../components/SinglePlace/Header'
import globalStyles from '../utils/globalStyles'
import axios from '../config/axios'

const AddListingScreen = ({navigation, route}) => {

    // Styles 
    const { container, formGroup, titleStyle, btns, gallery, photoView, controlTxt, photoImg, photoControl } = styles
    const tabBarHeight = useBottomTabBarHeight()
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    const [formFields, setFormFields] = useState({
        city: "",
        category: "",
        name: "",
        introduction: "",
        phone: "",
        email: "",
        website: "",
        address: "",
        images: [] // [{uri: ""}, ...]
    })

    useEffect(() => {
        const city = route.params.city
        // add selected images to the list
        let updatedImages = []
        if(route.params.selectedImgs) {
            const selectedImgs = route.params.selectedImgs
            if(selectedImgs.length) {
                updatedImages = formFields.images.concat(selectedImgs)
                console.log({updatedImages})
            }
        }

        setFormFields({
            ...formFields,
            images: updatedImages,
            city
        })

    }, [route.params])
 
    useEffect(() => {
        // Get all cities
        axios.get('/cities').then(res => {
            setCities(res.data)
        }).catch(err => {
            alert(err.response.data)
        })
        // Get all Categories
        axios.get('/categories').then(res => {
            setCategories(res.data)
        }).catch(err => {
            alert(err.response.data)
        })
    }, [])

    const btn = {
        icon: "arrow-up",
        title: "upload photos"
    }

    const openLocalGallery = () => {
        navigation.navigate('Local Gallery')
    }

    const handleFormChanges = (value, label) => {
        setFormFields({
            ...formFields,
            [label]: value
        })
    }

    const handleDelete = (idx) => {
        const updated = formFields.images.filter((img, i) => i !== idx)
        setFormFields({
            ...formFields,
            images: updated
        })
    }

    const handleCancel = () => {
        route.params.selectedImgs = []
        navigation.goBack()
    }

    const handleSubmit = async () => {

        // covert img uris to base64 strings and add filename
        const images = await Promise.all(formFields.images.map(async(img) => {
            const filename = img.uri.split('/').pop()
            const base64 = await FileSystem.readAsStringAsync(
                img.uri,
                {encoding: "base64"}
            )
            return {filename, base64}
        }))
        
        let _formFields = {
            ...formFields,
            images
        }
        const body = {place: _formFields}
        axios.post('/places/add-place', body).then(res => {
            if(res.status === 200) {
                route.params.selectedImgs = []
                setFormFields({
                    ...formFields,
                    city: "",
                    category: "",
                    name: "",
                    introduction: "",
                    phone: "",
                    email: "",
                    website: "",
                    address: "",
                    images: []
                })
                navigation.navigate('Single City', {city: formFields.city})
            }
        })
    }

    const SinglePhoto = ({img, idx}) => (
        <View style={photoView}>
            <Image source={{uri: img.uri}} style={photoImg} />
            <TouchableOpacity style={photoControl} onPress={() => handleDelete(idx)}>
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
                    <CustomText style={titleStyle}>City</CustomText>
                    <DropdownSelect data={cities}
                                    defaultOption="Select a city"
                                    value={formFields['city']}
                                    color={globalStyles.textColor}
                                    handleChange={(value) => handleFormChanges(value, 'city')} />
                </View>
                <View style={formGroup}>
                    <CustomText style={titleStyle}>Category</CustomText>
                    <DropdownSelect data={categories}
                                    defaultOption="Select a category"
                                    value={formFields['category']}
                                    color={globalStyles.textColor}
                                    handleChange={(value) => handleFormChanges(value, 'category')} />
                </View>
                <View style={formGroup}>
                        <CustomText style={titleStyle}>Name</CustomText>
                        <CustomInput  width="100%"
                                      placeholder="Name of the place"
                                      value={formFields['name']}
                                      onChangeText={(value) => handleFormChanges(value, 'name')} />
                </View>
                <View style={formGroup}>
                    <CustomText style={titleStyle}>Introduction</CustomText>
                    <CustomInput  width="100%"
                                  height={100}
                                  placeholder="Enter introduction here"
                                  value={formFields['introduction']}
                                  onChangeText={(value) => handleFormChanges(value, 'introduction')}
                                  type="textarea" />
                </View>
                <View style={formGroup}>
                    <CustomText style={titleStyle}>Contact Info</CustomText>
                    <View style={{ flexDirection: "row", marginBottom: 8, justifyContent: "space-between" }}>
                        <CustomInput  width="49%"
                                      placeholder="Phone"
                                      keyboardType="number-pad"
                                      value={formFields['phone']}
                                      onChangeText={(value) => handleFormChanges(value, 'phone')} />
                        <CustomInput  width="49%"
                                      placeholder="Email"
                                      keyboardType="email-address"
                                      value={formFields['email']}
                                      onChangeText={(value) => handleFormChanges(value, 'email')}
                                      autoCapitalize="none" />
                    </View>
                    <View>
                        <CustomInput  width="100%"
                                      placeholder="Website"
                                      value={formFields['website']}
                                      onChangeText={(value) => handleFormChanges(value, 'website')}
                                      autoCapitalize="none" />
                    </View>
                </View>
                <View style={formGroup}>
                    <CustomText style={titleStyle}>Address</CustomText>
                    <CustomInput  width="100%"
                                  placeholder="Enter address here"
                                  value={formFields['address']}
                                  onChangeText={(value) => handleFormChanges(value, 'address')} />
                </View>
                <View style={formGroup}>
                    <SectionHeader title="Gallery" btn={btn} onPress={openLocalGallery} />
                    <View style={gallery}>
                        {formFields.images.length ? 
                        formFields.images.map((img, i) => <SinglePhoto key={i} img={img} idx={i} />) :
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
                                  width="49%"
                                  onPress={handleSubmit}/>
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