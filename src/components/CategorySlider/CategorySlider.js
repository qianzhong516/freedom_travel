import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import CategoryTag from './CategoryTag'
import SvgIcon from '../SvgIcon'
import axios from '../../config/axios'

const CategorySlider = () => {

    // Styles
    const { container } = styles 
    const slider = useRef()
    const [x, setX] = useState(0)
    const [contentWidth, setContentWidth] = useState(0)
    const [sliderWidth, setSliderWidth] = useState(0)
    const interval = 100
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('/categories').then((res) => {
            const results = res.data
            const updatedCat = results.map(cat => {
                let svgIcon 
                switch (cat.name) {
                    case "restaurants":
                        svgIcon = <SvgIcon name="restaurant" size={35} />
                        break;
                    case "places to visit":
                        svgIcon = <SvgIcon name="building" size={35} />
                        break;
                    case "places to stay":
                        svgIcon = <SvgIcon name="home" size={35} />
                        break;
                    case "KTVs":
                        svgIcon = <SvgIcon name="ktv" size={35} />
                        break;
                    default:
                        break;
                }
                return {
                    id: cat._id,
                    name: cat.name,
                    svgIcon
                }
            })
            console.log({updatedCat})
            setCategories(updatedCat)
        }).catch(err => {
            console.log(err)
            alert('Something went wrong.')
        })
    }, [])
    
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
                {categories.map(cat => <CategoryTag key={cat.id}
                                                    title={cat.name} 
                                                    icon={cat.svgIcon} />)}
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