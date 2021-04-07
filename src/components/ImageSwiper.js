import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, FlatList, Image, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import GestureRecognizer from 'react-native-swipe-gestures'

import CustomText from './CustomText'

const ImageSwiper = ({images, currentIndex}) => {

    // Styles
    const { notation, notationText } = styles

    const swiper = useRef()
    const [idx, setIdx] = useState(currentIndex)

    const renderItem = ({item}) => {
        return <Image source={{uri: item.uri}} style={styles.img} />
    }

    useEffect(() => {
        swiper.current.scrollToIndex({
            index: currentIndex, 
            animated: false
        })
        setIdx(currentIndex)
    }, [currentIndex])

    const handlePrev = () => {
        // Update state in a function because the next state relies on the prev state
        setIdx((prevState) => {
            const next = prevState + 1 > images.length - 1 ? 0 : prevState + 1
            swiper.current.scrollToIndex({index: next})
            return next
        })
    }

    const handleNext = () => {
        setIdx(prevState => {
            const next = prevState - 1 < 0 ? images.length - 1 : prevState - 1
            swiper.current.scrollToIndex({index: next})
            return next
        })
    }

    return (
        <View>
            <GestureRecognizer
                    onSwipeLeft={handlePrev}
                    onSwipeRight={handleNext} >
                    <FlatList data={images} 
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            horizontal
                            ref={swiper}
                            scrollEnabled={false}
                            getItemLayout={(data, index) => ({
                                length: wp("100%"), 
                                offset: wp("100%") * index, 
                                index}
                            )}
                            showsHorizontalScrollIndicator={false} />
            </GestureRecognizer>
            <View style={notation}>
                <CustomText style={notationText} >{idx+1}/{images.length}</CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: wp("100%"),
        height: 350
    },
    notation: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 8
    },
    notationText: {
        fontSize: 16
    }
})
export default ImageSwiper