import React, { useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import GestureRecognizer from 'react-native-swipe-gestures'

import CustomText from '../CustomText'
import ContactIcon from './ContactIcon'
import globalStyles from '../../utils/globalStyles'

const Contact = ({contactInfo}) => {

    // Styles 
    const { container, head, content, text } = styles

    const [show, setShow] = useState(false)

    const toggleContactInfo = () => {
        setShow(!show)
    }

    return (
        <View style={container}>
            <GestureRecognizer onSwipeUp={toggleContactInfo}
                               onSwipeDown={toggleContactInfo} >
                <TouchableWithoutFeedback onPress={toggleContactInfo}>
                    <View style={head}>
                        <CustomText style={text}>Contact Information</CustomText> 
                        {!show && <Icon name="chevron-double-up" size={25} color={globalStyles.textColor} />}  
                        {show && <Icon name="chevron-double-down" size={25} color={globalStyles.textColor} />}  
                    </View>
                </TouchableWithoutFeedback>
                <View style={[content, {display: show ? "flex":"none"}]}>
                    <ContactIcon icon="laptop" title="Go to website" />
                    <ContactIcon icon="phone" title={contactInfo && contactInfo.phone} />
                    <ContactIcon icon="email-outline" title={contactInfo && contactInfo.email} />
                </View>
            </GestureRecognizer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 60,
        backgroundColor: '#E6E6E6',
        borderTopWidth: 1,
        borderTopColor: '#808080',
        borderBottomWidth: 1,
        borderBottomColor: '#808080'
    },
    head: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    text: {
        fontSize: 16,
        color: globalStyles.textColor
    }
})
export default Contact