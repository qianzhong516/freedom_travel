import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import Header from '../components/Header'
import Banner from '../components/Banner'
import CityCard from '../components/CityCard'
import axios from '../config/axios'

const DiscoverScreen = ({ navigation }) => {

    // Get tab bar's height
    const tabBarHeight = useBottomTabBarHeight()
    const [cities, setCities] = useState([])

    useEffect(() => {
        axios.get('/cities').then((res) => {
            setCities(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const handlePress = (name) => {
        navigation.navigate('Single City', {city: name})
    }
    
    return (
        <>
            <Header />
            <ScrollView style={{marginBottom: tabBarHeight}} >
                <Banner title="Explore Cities" />
                {cities.map(city => <CityCard key={city._id}
                                              source={{uri: city.uri}} 
                                              title={city.name} 
                                              onPress={() => handlePress(city.name)} />)}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({})
export default DiscoverScreen