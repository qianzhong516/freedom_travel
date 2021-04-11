import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import Banner from '../components/Banner'
import Header from '../components/Header'
import PlaceCard from '../components/PlaceCard'
import DropdownSelect from '../components/DropdownSelect/DropdownSelect'
import globalStyles from '../utils/globalStyles'
import CustomText from '../components/CustomText'
import RoundIcon from '../components/RoundIcon'
import axios from '../config/axios'

const TravelScreen = ({navigation}) => {

    // Styles 
    const { filters, filterTitle, iconContainer } = styles

    const tabBarHeight = useBottomTabBarHeight()
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    const [city, setCity] = useState()
    const [category, setCategory] = useState()
    const [allTravels, setAllTravels] = useState([])
    const [travels, setTravels] = useState([])
    const [refresh, setRefresh] = useState(false)

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

        // make screen rerender on focus
        navigation.addListener('focus', () => {
            // Get all travel options created by the current user
            axios.post('/places/byuser').then(res => {
                setTravels(res.data)
                setAllTravels(res.data)
            }).catch(err => {
                console.log(err)
                alert('Something went wrong.')
            })
        })

    }, [])

    const handlePress = (placeId) => {
        navigation.navigate('Single Place', { placeId })
    }

    // handle data selection change
    const handleCityChange = (option) => {
        const places = allTravels.filter(travel => {
            const catFilter = category ? travel.category.name === category: true
            return travel.city.name === option && catFilter
        })
        console.log(travels, option)
        setCity(option)
        setTravels(places)
    }

    const handleCategoryChange = (option) => {
        
        const places = allTravels.filter(travel => {
            const cityFilter = city ? travel.city.name === city: true
            return travel.category.name === option && cityFilter
        })
        setCategory(option)
        setTravels(places)
    }

    const addListing = () => {
        navigation.navigate('Listing Form', {
            title: "Add New Listing", 
            city: "", 
            selectedImgs: []
        })
    }

    const handleRefresh = useCallback(() => {
        setRefresh(true)
        // Get all travel options created by the current user
        axios.post('/places/byuser').then(res => {
            setCity()
            setCategory()
            setTravels(res.data)
            setAllTravels(res.data)
            setRefresh(false)
        }).catch(err => {
            console.log(err)
            alert('Something went wrong.')
        })
    }, [])

    return (
        <>
            <Header />
            <ScrollView style={{marginBottom: tabBarHeight }}
                        refreshControl={<RefreshControl refreshing={refresh}
                                                        onRefresh={handleRefresh}/>}>
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
                    {travels && travels.map(item => 
                                                    <PlaceCard key={item._id} 
                                                            img={{uri: item.photos[0]}} 
                                                            title={item.name} 
                                                            tag={item.category.name} 
                                                            onPress={() => handlePress(item._id)} />)}
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
        fontFamily: "RalewayBold",
        color: globalStyles.textColor,
        marginBottom: 8, 
        marginLeft: 1 
    },
    iconContainer: {
        position: "absolute",
        right: 20
    }
})
export default TravelScreen