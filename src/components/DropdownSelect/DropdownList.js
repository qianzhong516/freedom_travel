import React from 'react'
import { View, StyleSheet, FlatList, Modal, TouchableOpacity, ScrollView } from 'react-native'

import CustomText from '../CustomText'
import CustomButton from '../CustomButton'

const DropdownList = ({data, visible, closeModal, handleChange}) => {
    /* 
        data: {
            id: "",
            option: ""
       }
    */

    // Styles 
    const { centerView, modalView, itemContainer, itemText } = styles

    const renderItem = ({ item, idx }) => {
        return (<TouchableOpacity onPress={() => {handleChange(item.option); closeModal()}}>
                    <View key={idx} style={itemContainer}>
                        <CustomText style={itemText}>{item.option}</CustomText>
                    </View>
                </TouchableOpacity>)
    }   

    return (
            <Modal visible={visible} transparent={true}>
                <View style={centerView}>
                    <View style={modalView}>
                        <FlatList data={data}
                                    keyExtractor={item => item.id}
                                    renderItem={renderItem} />
                        <CustomButton title="Close" onPress={closeModal} >Close</CustomButton>
                    </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    centerView: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        flex: .5,
        width: "80%",
        padding: 16,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },  
    itemContainer: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E6E6E6",
        marginBottom: 8,
        paddingVertical: 8
    },
    itemText: {
        width: "60%",
        fontSize: 18,
        textAlign: "center"
    }
})
export default DropdownList