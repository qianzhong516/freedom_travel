import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import globalStyles from '../../utils/globalStyles'
import CustomText from '../CustomText'

const Tabs = ({tabs, toggleTab}) => {

    // Styles
    const { container, tabContainer, tabStyle } = styles

    const highlightStyles = {
        borderBottomWidth: 2
    }

    return (
        <View style={container}>
            {tabs.map((tab, i) => <TouchableWithoutFeedback key={tab.title} onPress={() => toggleTab(tab.id)}>
                                    <View style={[
                                            tab.active ? highlightStyles : null, 
                                            tabContainer
                                        ]}>
                                        <CustomText style={tabStyle}>
                                            {tab.title}
                                        </CustomText>
                                    </View>
                                  </TouchableWithoutFeedback>)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: globalStyles.primaryColor
    },
    tabContainer: {
        borderBottomColor: globalStyles.secondaryColor,
        paddingVertical: 5
    },  
    tabStyle: {
        color: "#FFF",
        fontSize: 14
    }
})
export default Tabs