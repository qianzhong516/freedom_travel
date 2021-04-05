import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import Header from '../components/Header'
import Banner from '../components/Banner'
import CityCard from '../components/CityCard'
import Shanghai from '../../assets/images/shanghai.png'

const DiscoverScreen = ({ navigation }) => {

    // Get tab bar's height
    const tabBarHeight = useBottomTabBarHeight()

    const handlePress = (city) => {
        navigation.navigate('Single City', {city})
    }
    
    return (
        <>
            <Header />
            <ScrollView style={{marginBottom: tabBarHeight}} >
                <Banner title="Explore Cities" />
                <CityCard source={Shanghai} title="shanghai" onPress={() => handlePress('shanghai')} />
                <CityCard source={Shanghai} title="shanghai" />
                <CityCard source={Shanghai} title="shanghai" />
                <CityCard source={Shanghai} title="shanghai" />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({})
export default DiscoverScreen