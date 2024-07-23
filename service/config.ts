import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = `http://192.168.1.102:${process.env.PORT || 1337}`;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

instance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;