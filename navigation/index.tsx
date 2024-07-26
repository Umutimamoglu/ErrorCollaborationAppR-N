import { NavigationContainer } from '@react-navigation/native';
import useUserGlobalStore from '../store/useUserGlobalStore';
import AppStackNavigator from './app-stack-navigator';
import AuthStackNavigator from './auth-stack-navigator';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigation = () => {
    const { user, updateUser } = useUserGlobalStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const storedState = await AsyncStorage.getItem('ErrorCol-store');
                if (storedState) {
                    const parsedState = JSON.parse(storedState);
                    if (parsedState?.state?.user) {
                        updateUser(parsedState.state.user);
                    }
                }
            } catch (error) {
                console.log('Error reading user state from AsyncStorage:', error);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
};

export default Navigation;