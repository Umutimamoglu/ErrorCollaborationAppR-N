import { Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from '../../navigation/types';
import { registerUser } from '../../service/api';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../src/shared/input';
import { Box, Text } from '../../utils/theme';
import Button from '../../src/shared/button';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';

import { Feather } from '@expo/vector-icons';
import NavigateBack from '../../src/shared/navigate-back';



interface IUser {
    name: string;
    email: string;
    password: string;
}

const SingUpScreen = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>()
    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn")
    }

    const { control, handleSubmit, formState: { errors } } = useForm<IUser>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: IUser) => {
        try {
            const { email, name, password } = data;
            console.log('Registering user:', { email, name, password });
            await registerUser({
                email,
                name,
                password
            });
            navigateToSignInScreen();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error in onSubmit:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error in onSubmit:', error);
            }
        }
    }

    return (
        <SafeAreaWraper >
            <Box flex={1} px="5.5" bg="zinc400">

                <Box flexDirection="row">

                    <NavigateBack />

                    <Box ml="13" justifyContent="center">
                        <Text fontSize={17} fontWeight="500">
                            Set Up your account

                        </Text>
                    </Box>
                </Box>

                <Box mb='6' />
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Name"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}

                        />
                    )}
                    rules={{ required: 'Name is required' }}
                />
                <Box mb='6' />
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}

                        />
                    )}
                    rules={{ required: 'Email is required' }}
                />
                <Box mb='6' />
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Password"

                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry

                        />
                    )}
                    rules={{ required: 'Password is required' }}
                />
                <Box mt='5.5' />

                <Pressable onPress={navigateToSignInScreen}>
                    <Text textAlign='right' color="red500" >
                        Zaten bir hesabınız var mı?
                    </Text>
                </Pressable>
                <Box mt="12" ml="10">

                    <Button label='Kayıt Ol' onPress={handleSubmit(onSubmit)} uppercase />
                </Box>


            </Box>
        </SafeAreaWraper>
    )
}


export default SingUpScreen