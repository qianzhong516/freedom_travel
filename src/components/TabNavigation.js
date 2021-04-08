import React from 'react'
import { StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import globalStyles from '../utils/globalStyles'
import DiscoverScreen from '../screens/DiscoverScreen'
import TravelScreen from '../screens/TravelScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SingleCityScreen from '../screens/SingleCityScreen'
import SinglePlaceScreen from '../screens/SinglePlaceScreen'
import SinglePhoto from './SinglePhoto'
import AddListingScreen from '../screens/AddListingScreen'

const Tab = createBottomTabNavigator()
const { Navigator, Screen } = Tab

const TabNavigation = () => {

    // Styles
    const { primaryColor } = globalStyles

    return (
        <Navigator  initialRouteName="Account"
                    sceneContainerStyle={{ // screen wrapper style
                        marginTop: StatusBar.currentHeight + 5
                    }}
                    screenOptions={({route}) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let icon = ""
                            switch (route.name) {
                                case "Discover":
                                    icon = "compass"
                                    break
                                case "My Travel":
                                    icon = "wallet-travel"
                                    break
                                default:
                                    icon = "clipboard-list-outline"
                                    break
                            }
                            return <Icon name={icon} size={32} color={color} />
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: primaryColor,
                        inactiveTintColor: 'gray',
                        style: {
                            position: 'absolute',
                            height: 60
                        },
                        labelStyle: {
                            marginTop: -5,
                            paddingBottom: 5,
                            fontSize: 12
                        }
                    }}>
            <Screen name="Discover" component={DiscoverScreen} />
            <Screen name="My Travel" component={TravelScreen} />
            <Screen name="Account" component={ProfileScreen} />
            <Screen name="Single City" 
                    component={SingleCityScreen} 
                    options={{
                        tabBarButton: () => null // Do not register extra btn in the bottom tab
                    }} />
            <Screen name="Single Place" 
                    component={SinglePlaceScreen} 
                    options={{ tabBarButton: () => null }} />

            <Screen name="Single Photo" 
                    component={SinglePhoto} 
                    options={{ tabBarButton: () => null }} />

            <Screen name="Add Listing" 
                    component={AddListingScreen} 
                    options={{ tabBarButton: () => null }} />    
        </Navigator>
    )
}

export default TabNavigation