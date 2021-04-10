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

const ListingFormScreen = ({navigation, route}) => {
    // route: { title, placeId, city, selectedImgs }

    // Styles 
    const { container, formGroup, titleStyle, btns, gallery, photoView, controlTxt, photoImg, photoControl } = styles
    const tabBarHeight = useBottomTabBarHeight()
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    // selected images from local gallery
    const [selectedImgs, setSelectedImgs] = useState([]) 
    const [formFields, setFormFields] = useState({
        city: "",
        category: "",
        name: "",
        introduction: "",
        phone: "",
        email: "",
        website: "",
        address: "",
        photos: [] // [uri, ...]
    })

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

    useEffect(() => {
        // load selected photos to the existing list if there is any
        if(route.params.selectedImgs.length) {
            let _selectedImgs = route.params.selectedImgs
            let existingImgs = formFields.photos
            setFormFields({
                ...formFields,
                photos: existingImgs.concat(_selectedImgs)
            }) 
            setSelectedImgs(_selectedImgs)
        }
    }, [route.params.selectedImgs])
 
    useEffect(() => {
        if(route.params.placeId) {
            axios.get('/places', {
                params: { id: route.params.placeId }
            }).then(res => {
                // console.log('place info: ', res.data)
                const place = res.data
                setFormFields({
                    ...formFields,
                    ...place,
                    _id: route.params.placeId,
                    city: place.city.name,
                    category: place.category.name
                })
            }).catch(err => {
                console.log(err)
                alert('Something went wrong.')
            }) 
        }else {
            const city = route.params.city
            setFormFields({ 
                city,
                category: "",
                name: "",
                introduction: "",
                phone: "",
                email: "",
                website: "",
                address: "",
                photos: []
            })
        }

        // **important** reset selectedImgs
        setSelectedImgs([])
    }, [route.params.placeId])

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

    const handleDelete = (uri) => {
        // remove the image from the rendering list
        const updated = formFields.photos.filter((item) => item !== uri)
        console.log('remove the image from the rendering list', updated)

        // if the image's url starts with `http://`, delete it from the database,
        // so it doesn't need to be included in the editing data.
        if(uri.startsWith("http://")) {
            const body = {
                placeId: route.params.placeId,
                filename: uri.split('/').pop()
            }
            axios.post('/places/delete-img', body).then(res => {
                if(res.status === 200) {
                    alert('The image has been deleted!')
                    setFormFields({
                        ...formFields,
                        photos: updated
                    })
                }
            })
        }else {
            setFormFields({
                ...formFields,
                photos: updated
            })
        }
    }

    const handleCancel = () => {
        navigation.navigate('Single Place', {placeId: route.params.placeId})
    }

    const handleSubmit = async () => {
        // upload locally selected images
        // covert img uris to base64 strings and add filename
        let photos = []
        if(selectedImgs.length) {
            photos = await Promise.all(selectedImgs.map(async(uri) => {
                const filename = uri.split('/').pop()
                const base64 = await FileSystem.readAsStringAsync(
                    uri,
                    {encoding: "base64"}
                )
                return {filename, base64}
            }))
        }
        
        let _formFields = {
            ...formFields,
            // **important** _id for updating the place from db 
            _id: route.params.placeId, 
            photos
        }
        const body = {place: _formFields}
        console.log({body})

        if(route.params.title === "Add New Listing") {
            axios.post('/places/add-place', body).then(res => {
                if(res.status === 200) {
                    navigation.navigate('Single City', {city: formFields.city})
                }
            })
        }else if(route.params.title === "Edit Listing"){
            axios.post('/places/edit-place', body).then(res => {
                if(res.status === 200) {
                    alert('This listing has been edited!')
                    console.log('update after editing: ', res.data)
                    const updated = {
                        city: res.data.city,
                        category: res.data.category,
                        name: res.data.name,
                        introduction: res.data.introduction,
                        phone: res.data.phone,
                        email: res.data.email,
                        website: res.data.website,
                        address: res.data.address,
                        photos: res.data.photos
                    }
                    setFormFields(updated)
                }
            }).catch(err => {
                console.log(err)
                alert('Update listing has failed.')
            })
        }
   
    }

    const SinglePhoto = ({img, uri}) => (
        <View style={photoView}>
            <Image source={img} style={photoImg} />
            <TouchableOpacity style={photoControl} onPress={() => handleDelete(uri)}>
                <CustomText style={controlTxt}>X</CustomText>
            </TouchableOpacity>
        </View>
    )

    return (
        <>
            <Header />
            <Banner title={route.params.title} />
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
                        {formFields.photos.length ? 
                        formFields.photos.map((uri, i) => <SinglePhoto key={i} img={{uri}} uri={uri} />) :
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
export default ListingFormScreen