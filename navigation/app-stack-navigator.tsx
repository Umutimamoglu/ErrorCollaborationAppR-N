import React from 'react'; // React'ı import edin
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./types";
import BottomTabNavigator from "./bottom-tab-navigator";
import HomeScreen from '../screens/home-screen';

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={HomeScreen}
                options={{
                    headerShown: false,
                }}

            />
        </Stack.Navigator>
    )
}

export default AppStackNavigator;