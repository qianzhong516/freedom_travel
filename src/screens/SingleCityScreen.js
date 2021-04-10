import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
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
    const { city } = route.params
    // const [city, setCity] = useState(route.params.city)
    const [places, setPlaces] = useState([])

    useEffect(() => {
        // get all places of this city
        axios.get('/places/city', { 
            params: {city: city}  
        }).then(res => {
            console.log(res.data)
            setPlaces(res.data)
        }).catch(err => {
            console.log(err)
            alert('Something went wrong.')
        })
    }, [route.params])

    const addListing = () => {
        navigation.navigate('Add Listing', { city })
    }
    
    const handlePress = (placeId) => {
        navigation.navigate('Single Place', { placeId })
    }

    return (
        <>
            <Header />
            <ScrollView contentContainerStyle={{paddingBottom: tabBarHeight}} >
                <Banner title={"Explore "+city} />
                <View style={{ marginHorizontal: 16 }}>
                    <CategorySlider />
                    {places.length ? places.map(place => 
                        <PlaceCard key={place._id} img={{uri: place.photos[0]}} title={place.name} tag="places to stay" onPress={() => handlePress(place._id)} />):
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