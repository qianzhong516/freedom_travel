import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'

import Introduction from '../SinglePlace/Introduction'
import Location from '../SinglePlace/Location'
import GallerySection from '../SinglePlace/GallerySection'
import CustomButton from '../CustomButton'

const TabContent = () => {

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
                return( <Introduction content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />)

            case "Location":
                return <Location address="123 Liverpool Rd, Ashfield, NSW 2131" />

            case "Gallery":
                return <GallerySection />

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
                                                             title="DELETE THIS LISTING" />}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
export default TabContent