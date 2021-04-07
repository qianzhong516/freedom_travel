import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import Banner from '../components/Banner'
import Header from '../components/Header'
import PlaceCard from '../components/PlaceCard'
import BG from '../../assets/images/place.jpg'
import DropdownSelect from '../components/DropdownSelect/DropdownSelect'
import globalStyles from '../utils/globalStyles'
import CustomText from '../components/CustomText'
import RoundIcon from '../components/RoundIcon'

const TravelScreen = () => {

    // Styles 
    const { filters, filterTitle, iconContainer } = styles

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

    const categories = [
        {
            id: "1",
            option: "cat 1"
        },
        {
            id: "2",
            option: "cat 2"
        }
    ]

    const navigation = useNavigation()
    const tabBarHeight = useBottomTabBarHeight()
    const [city, setCity] = useState()
    const [category, setCategory] = useState()

    const handlePress = (place) => {
        navigation.navigate('Single Place', { place })
    }

    // handle data selection change
    const handleCityChange = (option) => {
        setCity(option)
    }

    const handleCategoryChange = (option) => {
        setCategory(option)
    }

    const addListing = () => {
        navigation.navigate('Add Listing')
    }

    return (
        <>
            <Header />
            <ScrollView style={{marginBottom: tabBarHeight }}>
                <Banner title="My Travel" />
                <View style={{ marginHorizontal: 16 }}>
                    <CustomText style={filterTitle}>Filter by</CustomText>
                    <View style={filters}>
                        <DropdownSelect defaultOption="City" 
                                        color={globalStyles.textColor}
                                        data={cities}
                                        handleChange={handleCityChange}
                                        value={city} />
                        <DropdownSelect defaultOption="Category" 
                                        color={globalStyles.textColor}
                                        data={categories}
                                        handleChange={handleCategoryChange}
                                        value={category} />
                    </View>
                    <PlaceCard img={BG} title="Hotel" tag="places to stay" onPress={() => handlePress('Hotel')} />
                    <PlaceCard img={BG} title="Museum" tag="places to stay" />
                    <PlaceCard img={BG} title="ThaiBreak" tag="places to stay" />
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
    filters: {
        flexDirection: "row",
        flex: 1,
        marginBottom: 16,
    },
    filterTitle: { 
        marginBottom: 8, 
        marginLeft: 1 
    },
    iconContainer: {
        position: "absolute",
        right: 20
    }
})
export default TravelScreen