import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import CategoryTag from './CategoryTag'
import SvgIcon from '../SvgIcon'

const CategorySlider = () => {

    // Styles
    const { container } = styles 

    const slider = useRef()
    const [x, setX] = useState(0)
    const [contentWidth, setContentWidth] = useState(0)
    const [sliderWidth, setSliderWidth] = useState(0)
    const interval = 100
    
    // Slider controls
    const slideLeft = () => {
        // if not at the scroll start
        if(x > 0) {
            let newX = x-interval
            // if the scroll view is going to exceed the content area
            if(x-2*interval < 0) {
                newX = 0
            }
            setX(newX)
            slider.current.scrollTo({x: newX, y: 0, animated: true})
        }
    }

    const slideRight = () => {
        const xEnd = contentWidth-sliderWidth
        // if not at the scroll end
        if(x < xEnd) { 
            let newX = x+interval
            // if the scroll view is going to exceed the content area
            if(x+sliderWidth+2*interval > contentWidth) { 
                newX = contentWidth-sliderWidth
            }
            setX(newX)
            slider.current.scrollTo({x: newX, y: 0, animated: true})
        }
    }

    const getSliderDisplayWidth = (e) => {
        if(!sliderWidth) {
            // console.log('get slider width: ', sliderWidth)
            setSliderWidth(e.nativeEvent.layoutMeasurement.width)
        }
    }

    const getSliderContentWidth = (contentWidth, contentHeight) => {
        // console.log('get content width: ', contentWidth)
        setContentWidth(contentWidth)
    }

    return (
        <View style={container}>
            <TouchableOpacity onPress={slideLeft}>
                <Icon name="chevron-left" size={30} color="#808080" />
            </TouchableOpacity>
            <ScrollView horizontal 
                        ref={slider}
                        scrollEnabled={false}
                        onScroll={getSliderDisplayWidth}
                        onContentSizeChange={getSliderContentWidth}
                        showsHorizontalScrollIndicator={false} >
                <CategoryTag title="restaurants" icon={<SvgIcon name="restaurant" size={35} />} />
                <CategoryTag title="places to visit" icon={<SvgIcon name="building" size={35} />} />
                <CategoryTag title="places to stay" icon={<SvgIcon name="home" size={35} />} />
                <CategoryTag title="places to stay" icon={<SvgIcon name="home" size={35} />} />
            </ScrollView>
            <TouchableOpacity onPress={slideRight}>
                <Icon name="chevron-right" size={30} color="#808080" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        marginBottom: 16,
        alignItems: 'center'
    }
})
export default CategorySlider