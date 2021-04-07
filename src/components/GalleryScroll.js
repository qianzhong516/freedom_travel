import React from 'react'
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

const GalleryScroll = ({images, thumbSize, selectImg}) => {

    // Styles
    const { container, inner } = styles 

    return (
        <ScrollView horizontal contentContainerStyle={container} >
            <View style={inner}>
                {images.map((img, i) => <TouchableOpacity key={i} onPress={() => selectImg(i)}>
                                            <Image
                                                source={{uri: img.uri}}
                                                style={[{width: thumbSize, height: thumbSize}, styles.img]} />
                                        </TouchableOpacity>)}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8
    },
    inner: {
        flexDirection: "row"
    },  
    img: {
        marginRight: 10,
        resizeMode: "cover"
    }
})
export default GalleryScroll