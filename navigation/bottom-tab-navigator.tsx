import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "./types";
import HomeStackNavigator from "./home-stack-navigator";



import Icons from "../src/shared/icons";
import ProfileScreen from "../screens/profile-screen";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import FixedScreen from "../screens/FixedScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from "@shopify/restyle";
import React from "react";


const Tab = createBottomTabNavigator<RootBottomTabParamList>()

const BottomTabNavigator = () => {
    const theme = useTheme();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: theme.colors.gray550,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: theme.colors.zinc300, // Arka plan rengi burada ayarlanıyor
                    borderTopColor: "transparent" // Eğer tab bar üst çizgini kaldırmak istiyorsanız
                }
            }}
        >
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
                options={() => ({
                    title: "Home",
                    tabBarIcon: ({ color }) => <Icons name="home" color={color} />,
                    headerShown: false,
                })}
            />

            <Tab.Screen
                name="Feed"
                component={FixedScreen}
                options={() => ({
                    title: "Feed",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="rss-feed" color={color} size={size} />
                    ),
                    headerShown: false,
                })}
            />
            <Tab.Screen
                name="Fixed"
                component={FixedScreen}
                options={() => ({
                    title: "Bugs",
                    tabBarIcon: ({ color }) => <MaterialIcons name="error-outline" size={24} color="black" />,
                    headerShown: false,
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={() => ({
                    title: "Profile",
                    tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faUser} color={color} />,
                    headerShown: false,
                })}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;