import { NavigationContainer } from "@react-navigation/native"

import useUserGlobalStore from "../store/useUserGlobalStore"
import { useEffect } from "react"
import AppStackNavigator from "./app-stack-navigator"
import AuthStackNavigator from "./auth-stack-navigator"


const Navigation = () => {
    const { user } = useUserGlobalStore()

    return (
        <NavigationContainer>
            {user ? <AppStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    )
}

export default Navigation