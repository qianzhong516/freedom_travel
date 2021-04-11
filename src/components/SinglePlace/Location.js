import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

import globalStyles from '../../utils/globalStyles'
import CustomText from '../CustomText'


const Location = ({address}) => {

    // Styles
    const { container, map, textContainer, title } = styles

    return (
        <View style={container}>
            <CustomText style={title}>Location</CustomText>
            <View style={textContainer}>
                <CustomText style={{ fontFamily: "RalewayBold", 
                                     color: globalStyles.textColor }}>Address: </CustomText>
                <CustomText style={{ color: globalStyles.textColor }}>{address}</CustomText>
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
        flexDirection: "row",
        marginBottom: 12
    },
    title: {
        fontFamily: "RalewayBold",
        fontSize: 16,
        color: globalStyles.textColor,
        marginBottom: 5
    }
})
export default Location