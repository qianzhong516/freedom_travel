import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import Header from '../components/Header'
import Banner from '../components/Banner'
import CategorySlider from '../components/CategorySlider/CategorySlider'
import PlaceCard from '../components/PlaceCard'
import RoundIcon from '../components/RoundIcon'
import axios from '../config/axios'
import CustomText from '../components/CustomText'

const SingleCityScreen = ({route, navigation}) => {

    // Styles
    const { iconContainer } = styles
    // Get tab bar's height
    const tabBarHeight = useBottomTabBarHeight()
    // const { city } = route.params
    const [state, setState] = useState({
        city: null,
        places: [],
        allPlaces: [],
        refreshing: false
    })

    useEffect(() => {
        // get all places of this city
        axios.get('/places/city', { 
            params: {city: route.params.city}  
        }).then(res => {
            console.log('get all places: ', res.data)
            setState({
                ...state,
                city: route.params.city,
                places: res.data,
                allPlaces: res.data
            })
        }).catch(err => {
            console.log(err)
            alert('Something went wrong.')
        })
    }, [route.params])

    const addListing = () => {
        navigation.navigate('Listing Form', {
            title: "Add New Listing",
            city: state.city,
            placeId: null,
            selectedImgs: []
        })
    }

    const handleCategoryFilter = (category) => {
        const results = state.allPlaces.filter(place => place.category.name === category)
        setState({
            ...state,
            places: results
        })
    }

    const handlePress = (placeId) => {
        navigation.navigate('Single Place', { placeId })
    }

    const handleRefresh = () => {
        setState({
            ...state,
            refreshing: true
        })
        axios.get('/places/city', { 
            params: {city: state.city}  
        }).then(res => {
            setState({
                ...state,
                places: res.data,
                allPlaces: res.data,
                refreshing: false
            })
        }).catch(err => {
            console.log(err)
            alert('Something went wrong.')
        })
    }

    return (
        <>
            <Header />
            <ScrollView contentContainerStyle={{paddingBottom: tabBarHeight}}
                        refreshControl={
                            <RefreshControl
                              refreshing={state.refreshing}
                              onRefresh={handleRefresh}
                            />
                          } >
                <Banner title={"Explore "+state.city} />
                <View style={{ marginHorizontal: 16 }}>
                    <CategorySlider onPress={handleCategoryFilter} />
                    {state.places.length ? state.places.map(place => 
                        <PlaceCard key={place._id} img={{uri: place.photos[0]}} title={place.name} tag={place.category.name} onPress={() => handlePress(place._id)} />):
                        <CustomText>No places are found.</CustomText>}
                </View>
            </ScrollView>
            <View style={[
                    {bottom: tabBarHeight + 20}, 
                    iconContainer
                  ]}>
                <RoundIcon name="plus" size={40} onPress={addListing} shadowed />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        position: "absolute",
        right: 20
    }
})
export default SingleCityScreen