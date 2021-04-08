import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import CustomText from '../CustomText'
import DropdownList from './DropdownList'
import { useState } from 'react'

const DropdownSelect = ({defaultOption, value, color, data, handleChange}) => {
    
    // Styles
    const {container, text} = styles
    const defaultContainerStyles = {
        borderWidth: 1,
        borderColor: color,
        borderRadius: 4
    }

    const [modalOpen, setModalOpen] = useState(false)

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <TouchableOpacity style={{flex: 1}}
                          onPress={toggleModal} >
            <View style={[defaultContainerStyles, container]}>
                <CustomText style={[{color}, text]}>
                    {value ? value : defaultOption}
                </CustomText>
                <Icon name="chevron-down" size={25} color={color} />
            </View>
            <DropdownList data={data} 
                          visible={modalOpen}
                          closeModal={toggleModal}
                          handleChange={handleChange} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingVertical: 2,
        paddingHorizontal: 8,
        marginHorizontal: 1
    },
    text: {

    }
})
export default DropdownSelect