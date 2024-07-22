import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "./types";
import HomeStackNavigator from "./home-stack-navigator";


import { color, useTheme } from "@shopify/restyle";
import Icons from "../src/shared/icons";


const Tab = createBottomTabNavigator<RootBottomTabParamList>()

const BottomTabNavigator = () => {
    const theme = useTheme()
    return (<Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: theme.colors.gray550,
            tabBarHideOnKeyboard: true,
        }}
    >
        <Tab.Screen name="HomeStack" component={HomeStackNavigator}
            options={() => ({
                title: "Home",
                tabBarIcon: ({ color }) => <Icons name="home" color={color}

                />,
                headerShown: false,
            })}
        />

    </Tab.Navigator>
    )
}

export default BottomTabNavigator