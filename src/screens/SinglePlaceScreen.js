import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

import Banner from '../components/Banner'
import Header from '../components/Header'
import TabContent from '../components/Tabs/TabContent'
import Tabs from '../components/Tabs/Tabs'
import Contact from '../components/SinglePlace/Contact'
import axios from '../config/axios'

const SinglePlaceScreen = ({navigation, route}) => {
    const s = useRef()

    const { placeId } = route.params
    const [placeInfo, setPlaceInfo] = useState()
    const [tabs, setTabs] = useState([
        {
            id: 0,
            title: "Overview", 
            active: true
        },
        {
            id: 2,
            title: "Gallery", 
            active: false          
        }
    ])

    const toggleTab = (id) => {
        const newTabs = tabs.map((tab) => {
            if(tab.id === id)
                tab.active = true
            else
                tab.active = false
            return tab
        })
        setTabs(newTabs)
        
        if(id === 2)
            s.current.scrollToEnd({animated: true})
    }

    useEffect(() => {
        axios.get('/places', {
            params: { id: placeId }
        }).then(res => {
            console.log('place info: ', res.data)
            setPlaceInfo(res.data)
        }).catch(err => {
            console.log(err)
            alert('Something went wrong.')
        })
    }, [route.params])

    const handleDeleteListing = (placeId) => {
        axios.post(`/places/delete-place/${placeId}`).then(res => {
            alert(res.data)
            navigation.navigate("My Travel")
        }).catch(err => {
            console.log(err)
            alert('Something went wrong.')
        })
    }

    const handleEditListing = (placeId) => {
        navigation.navigate('Listing Form', {
            title: "Edit Listing",
            // city: res.data.city.name,
            // editingData: res.data,
            placeId,
            selectedImgs: []
        })
       /*  axios.get('/places', {
            params: { id: placeId }
        }).then(res => {
            console.log('place info: ', res.data)
            navigation.navigate('Listing Form', {
                title: "Edit Listing",
                city: res.data.city.name,
                editingData: res.data,
                selectedImgs: []
            })
        }).catch(err => {
            console.log(err)
            alert('Something went wrong.')
        }) */
    }

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView ref={s} showsHorizontalScrollIndicator={false} >
                <Banner title={placeInfo && placeInfo.name} />
                <Tabs tabs={tabs} toggleTab={toggleTab} />
                <TabContent placeInfo={placeInfo} 
                            deleteListing={() => handleDeleteListing(placeId)}
                            EditListing={() => handleEditListing(placeId)} />
            </ScrollView>
            <Contact contactInfo={placeInfo && {
                                                    website: placeInfo.website, 
                                                    phone: placeInfo.phone, 
                                                    email: placeInfo.email 
                                                }} />
        </View>
    )
}

const styles = StyleSheet.create({})
export default SinglePlaceScreen