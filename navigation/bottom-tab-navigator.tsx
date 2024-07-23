import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "./types";
import HomeStackNavigator from "./home-stack-navigator";


import { color, useTheme } from "@shopify/restyle";
import Icons from "../src/shared/icons";
import ProfileScreen from "../screens/profile-screen";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import FixedScreen from "../screens/FixedScreen";
import { MaterialIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator<RootBottomTabParamList>()

const BottomTabNavigator = () => {
    const theme = useTheme();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: theme.colors.gray550,
                tabBarHideOnKeyboard: true,
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
                    tabBarIcon: ({ color }) => <MaterialIcons name="error-outline" size={24} color="black" />,
                    headerShown: false,
                })}
            />
            <Tab.Screen
                name="Fixed"
                component={FixedScreen}
                options={() => ({
                    title: "Fixed",
                    tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faSquareCheck} color={color} />,
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