import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

import CustomText from '../CustomText'
import Header from './Header'

const Location = ({address}) => {

    // Styles
    const { container, map, textContainer } = styles

    const btn = {
        icon: "lead-pencil",
        title: "edit"
    }
    return (
        <View style={container}>
            <Header title="Location" btn={btn}/>
            <View style={textContainer}>
                <CustomText>Address: {address}</CustomText>
            </View>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={map}
                scrollEnabled={false} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24
    },
    map: {
        height: 150
    },
    textContainer: {
        marginBottom: 12
    }
})
export default Location