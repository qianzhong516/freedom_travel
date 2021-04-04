import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import DiscoverScreen from '../screens/DiscoverScreen'
import TravelScreen from '../screens/TravelScreen'
import ProfileScreen from '../screens/ProfileScreen'
import globalStyles from '../utils/globalStyles'

const Tab = createBottomTabNavigator()
const { Navigator, Screen } = Tab

const TabNavigation = () => {

    // Styles
    const { primaryColor } = globalStyles

    return (
        <Navigator  initialRouteName="Account"
                    sceneContainerStyle={{ // screen wrapper style
                        marginTop: StatusBar.currentHeight + 5,
                        paddingHorizontal: 16
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
        </Navigator>
    )
}

export default TabNavigation