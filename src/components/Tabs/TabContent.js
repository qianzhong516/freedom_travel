import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'

import Introduction from '../SinglePlace/Introduction'
import Location from '../SinglePlace/Location'
import GallerySection from '../SinglePlace/GallerySection'
import CustomButton from '../CustomButton'

const TabContent = ({placeInfo, deleteListing}) => {

    const data = [
        {
            id: "0",
            title: "Introduction"
        },
        {
            id: "1",
            title: "Location"
        },
        {
            id: "2",
            title: "Gallery"            
        }
    ]


    const renderItem = ({item}) => {
        switch (item.title) {
            case "Introduction":  
                return( <Introduction content={placeInfo && placeInfo.introduction} />)

            case "Location":
                return <Location address={placeInfo && placeInfo.address} />

            case "Gallery":
                return <GallerySection images={placeInfo ? placeInfo.photos : []} />

            default:
                return null
        }
    }

    return (
        <View style={{ padding: 16, paddingBottom: 32 }}>
            <FlatList 
                    data={data} 
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={() => <CustomButton width="100%"
                                                             type="danger" 
                                                             title="DELETE THIS LISTING"
                                                             onPress={() => deleteListing(placeInfo._id)} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
export default TabContent