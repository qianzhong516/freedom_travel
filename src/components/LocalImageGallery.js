import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AssetsSelector } from 'expo-images-picker'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import globalStyles from '../utils/globalStyles'
import CustomText from './CustomText'

const LocalImageGallery = ({navigation}) => {

    const onDone = (assets) => {

        const uris = []
        assets.forEach(asset => {
            uris.push(asset.uri)
        })
        navigation.navigate('Listing Form', {selectedImgs: uris})
    }

    return (
        <AssetsSelector
            options={{
                manipulate: {
                    width: 512,
                    compress: 0.7,
                    base64: false,
                    saveTo: 'jpeg',
                },
                assetsType: ['photo'],
                maxSelections: 4,
                margin: 3,
                portraitCols: 4,
                landscapeCols: 5,
                widgetWidth: 100,
                widgetBgColor: "white",
                selectedBgColor: globalStyles.primaryColor,
                spinnerColor: globalStyles.primaryColor,
                videoIcon: {
                    Component: Icon,
                    iconName: 'video-outline',
                    color: 'white',
                    size: 30
                },
                selectedIcon: {
                    Component: Icon,
                    iconName: 'check-circle-outline',
                    color: 'white',
                    bg: 'rgba(205, 209, 147, 0.7)',
                    size: 30
                },
                defaultTopNavigator: {
                    continueText: 'Finish',
                    goBackText: 'Back',
                    // buttonStyle: validViewStyleObject,
                    textStyle: styles.text,
                    backFunction: () => navigation.goBack(),
                    doneFunction: (data) => onDone(data),
                },
                noAssets: {
                    Component: () => <CustomText>No Assets are found</CustomText>,
                },
            }}
        />  
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Raleway",
        fontSize: 18
    }
})
export default LocalImageGallery