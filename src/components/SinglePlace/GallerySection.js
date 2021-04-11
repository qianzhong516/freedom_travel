import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Header from './Header'
import globalStyles from '../../utils/globalStyles'
import GalleryScroll from '../GalleryScroll'
import CustomText from '../CustomText'

const GallerySection = ({images}) => {

    // Styles
    const { container, title } = styles

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
            <CustomText style={title}>Gallery</CustomText>
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
    },
    title: {
        fontFamily: "RalewayBold",
        fontSize: 16,
        color: globalStyles.textColor,
        marginBottom: 8
    }
})
export default GallerySection