import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Header from './Header'
import globalStyles from '../../utils/globalStyles'
import GalleryScroll from '../GalleryScroll'

const GallerySection = () => {

    // Styles
    const { container } = styles

    const navigation = useNavigation()

    const btn = {
        icon: "arrow-up",
        title: "upload photos"
    }

    // Fetched gallery images from database
    const images = [
        { uri: 'http://i.imgur.com/XP2BE7q.jpg', id: "0" },
        { uri: 'http://i.imgur.com/XP2BE7q.jpg', id: "1"},
        { uri: 'http://i.imgur.com/5nltiUd.jpg', id: "2" },
        { uri: 'http://i.imgur.com/6vOahbP.jpg', id: "3" },
        { uri: 'http://i.imgur.com/kj5VXtG.jpg', id: "4" }
    ]

    const handleSelectImg = (index) => {
        navigation.navigate('Single Photo', {
            images,
            index
        })
    }

    return (
        <View style={container}>
            <Header title="Gallery" btn={btn}/>
            <GalleryScroll images={images} thumbSize={70} selectImg={handleSelectImg} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24
    },
    text: {
        fontSize: 14,
        color: globalStyles.textColor,
        textAlign: "justify"
    }
})
export default GallerySection