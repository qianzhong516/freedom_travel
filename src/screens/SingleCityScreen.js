import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import Header from '../components/Header'
import Banner from '../components/Banner'
import CategorySlider from '../components/CategorySlider/CategorySlider'
import PlaceCard from '../components/PlaceCard'
import BG from '../../assets/images/place.jpg'
import RoundIcon from '../components/RoundIcon'

const SingleCityScreen = ({route}) => {

    // Styles
    const { iconContainer } = styles

    // Get tab bar's height
    const tabBarHeight = useBottomTabBarHeight()
    // Get params
    const { city } = route.params

    const addListing = () => {
        console.log('add listing')
    }

    return (
        <>
            <Header />
            <ScrollView contentContainerStyle={{paddingBottom: tabBarHeight}} >
                <Banner title={"Explore "+city} />
                <View style={{ marginHorizontal: 20 }}>
                    <CategorySlider />
                    <PlaceCard img={BG} title="Hotel" tag="places to stay" />
                    <PlaceCard img={BG} title="Museum" tag="places to stay" />
                    <PlaceCard img={BG} title="ThaiBreak" tag="places to stay" />
                </View>
            </ScrollView>
            <View style={[
                    {bottom: tabBarHeight + 20}, 
                    iconContainer
                  ]}>
                <RoundIcon name="plus" size={40} onPress={addListing} />
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