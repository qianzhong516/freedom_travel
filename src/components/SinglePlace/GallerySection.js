import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Header from './Header'
import globalStyles from '../../utils/globalStyles'
import GalleryScroll from '../GalleryScroll'

const GallerySection = ({images}) => {

    // Styles
    const { container } = styles

    const navigation = useNavigation()

    const btn = {
        icon: "arrow-up",
        title: "upload photos"
    }

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