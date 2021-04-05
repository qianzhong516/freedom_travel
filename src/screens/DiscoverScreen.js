import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import Header from '../components/Header'
import Banner from '../components/Banner'
import CityCard from '../components/CityCard'
import Shanghai from '../../assets/images/shanghai.png'

const DiscoverScreen = () => {

    // Get tab bar's height
    const tabBarHeight = useBottomTabBarHeight()
    
    return (
            <ScrollView style={{marginBottom: tabBarHeight}} >
                <Header />
                <Banner title="Explore Cities" />
                <CityCard source={Shanghai} title="Shanghai" />
                <CityCard source={Shanghai} title="Shanghai" />
                <CityCard source={Shanghai} title="Shanghai" />
                <CityCard source={Shanghai} title="Shanghai" />
            </ScrollView>
    )
}

const styles = StyleSheet.create({})
export default DiscoverScreen