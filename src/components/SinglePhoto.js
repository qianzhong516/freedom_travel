import React from 'react'
import { View, StyleSheet } from 'react-native'

import Header from './Header'
import ImageSwiper from './ImageSwiper'

const SinglePhoto = ({route}) => {

    // Styles
    const { container } = styles
    const {images, index} = route.params
 
    return (
        <View style={container}>
            <Header />
            <View style={{ flex: .85, justifyContent: 'center' }}>
                <ImageSwiper images={images}
                            currentIndex={index} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
})
export default SinglePhoto