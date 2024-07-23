
import { ILogin, IUser } from '../types';
import instance from './config';

export const registerUser = async (userData: IUser) => {
    const { data } = await instance.post('/api/users/create', userData);
    return data;
};

export const loginUser = async (loginData: ILogin) => {
    const { data } = await instance.post('/api/users/login', loginData);
    return data;
};