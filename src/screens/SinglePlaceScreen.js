import React, { useState, useRef } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

import Banner from '../components/Banner'
import Header from '../components/Header'
import TabContent from '../components/Tabs/TabContent'
import Tabs from '../components/Tabs/Tabs'
import Contact from '../components/SinglePlace/Contact'

const SinglePlaceScreen = ({route}) => {
    const s = useRef()

    const { place } = route.params
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

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView ref={s} showsHorizontalScrollIndicator={false} >
                <Banner title={place} />
                <Tabs tabs={tabs} toggleTab={toggleTab} />
                <TabContent />
            </ScrollView>
            <Contact />
        </View>
    )
}

const styles = StyleSheet.create({})
export default SinglePlaceScreen