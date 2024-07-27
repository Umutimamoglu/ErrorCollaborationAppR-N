import React, { useState } from 'react';
import { Pressable, TextInput, Image, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Box, Text, Theme } from '../../utils/theme';
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper';
import Button from '../../src/shared/button';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import axiosInstance, { BASE_URL } from '../../service/config';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { CreateError, ICreateErrorRequest, IColor } from '../../types';
import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import { getColors } from '../../utils/heplers';
import { CategoriesStackParamList } from '../../navigation/types';
import SearchableDropdown from 'react-native-searchable-dropdown';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = getColors();
const PROGRAMMING_LANGUAGES = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'C#' },
    { id: 5, name: 'C++' },
];

const ERROR_TYPES = [
    { id: 1, name: 'Compilation Errors' },
    { id: 2, name: 'Runtime Errors' },
    { id: 3, name: 'Arithmetic Errors' },
    { id: 4, name: 'Resource Errors' },
    { id: 5, name: 'Code Smells' },
    { id: 6, name: 'Golden Hammer' },
    { id: 7, name: 'Analysis Paralysis' }
];

const DEFAULT_COLOR = COLORS[0];
const DEFAULT_LANGUAGE = PROGRAMMING_LANGUAGES[0];
const DEFAULT_ERROR = ERROR_TYPES[0];

const CreateErrorRequest = async (
    url: string,
    { arg }: { arg: ICreateErrorRequest }
) => {
    try {
        console.log('Request payload:', arg);
        const response = await axiosInstance.post(url, {
            ...arg,
        });
        console.log('Response:', response);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('Axios error response data:', error.response?.data);
            console.log('Axios error request:', error.request);
            console.log('Axios error message:', error.message);
        } else {
            console.log('Unexpected error:', error);
        }
        throw error;
    }
};

type CreateErrorRouteTypes = RouteProp<
    CategoriesStackParamList,
    'CreateCategory'
>;

function HomeScreen() {

    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedErrorType, setselectedErrorType] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const theme = useTheme<Theme>();

    const { trigger } = useSWRMutation(
        'api/errors/create',
        CreateErrorRequest
    );

    const { mutate } = useSWRConfig();

    const [newError, setNewError] = useState<CreateError>({
        name: '',
        color: DEFAULT_COLOR.name,
        language: DEFAULT_LANGUAGE.name,
        isFixed: false,
        image: undefined,
        type: DEFAULT_ERROR.name
    });

    const updateErrorType = (errorType: string | null | undefined) => {
        const validErrorType = errorType || DEFAULT_ERROR.name;
        setNewError(prev => ({ ...prev, type: validErrorType }));
    };

    const createNewError = async () => {
        console.log('createNewError called');
        try {
            await trigger({
                ...newError,
            });
            await mutate(BASE_URL + 'api/errors/create');
        } catch (error) {
            console.log('error in createNewError', error);
            throw error;
        }
    };

    const updateColor = (color: IColor) => {
        setNewError((prev) => ({
            ...prev,
            color: color.name,
        }));
    };

    const updateLanguage = (language: string) => {
        setNewError((prev) => ({
            ...prev,
            language,
        }));
    };

    const chooseImage = async () => {
        let result: ImagePickerResponse = await launchImageLibrary({
            mediaType: 'photo',
            maxWidth: 200,
            maxHeight: 200,
            includeBase64: true
        });

        if (result.assets?.[0]?.uri) {
            setImage(result.assets[0].uri || null);
            setNewError((prev) => ({
                ...prev,
                image: result.assets?.[0]?.base64 || "",
            }));
        }
    };

    const captureImage = async () => {
        let result: ImagePickerResponse = await launchCamera({
            mediaType: 'photo',
            maxWidth: 200,
            maxHeight: 200,
            includeBase64: true
        });

        if (result.assets?.[0]?.uri) {
            setImage(result.assets[0].uri || null);
            setNewError((prev) => ({
                ...prev,
                image: result.assets?.[0]?.base64 || "",
            }));
        }
    };

    return (
        <SafeAreaWrapper>
            <Box flex={1} mx="6" justifyContent="center">
                <Box height={2} />
                <Text variant="textXl" textAlign="center" mb="4">
                    Yeni hata oluştur!!!
                </Text>
                <Box alignItems="center" mb="2">
                    <Pressable onPress={chooseImage} style={styles.pressable}>
                        <MaterialIcons name="photo-library" size={24} color="black" />
                        <Text>Galeri</Text>
                    </Pressable>
                    <Pressable onPress={captureImage} style={styles.pressable}>
                        <MaterialIcons name="camera-alt" size={24} color="black" />
                        <Text>Kamera</Text>
                    </Pressable>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </Box>
                <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                    <SearchableDropdown
                        onItemSelect={(item) => {
                            setSelectedLanguage(item.name);
                            updateLanguage(item.name);
                        }}
                        containerStyle={{ padding: 5 }}
                        textInputStyle={{
                            fontSize: 15,
                            lineHeight: 18,
                            padding: 12,
                            borderWidth: 1,
                            borderColor: 'gray.500',
                            backgroundColor: '#FAF7F6',
                        }}
                        itemStyle={{
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#FAF9F8',
                            borderColor: 'gray.500',
                            borderWidth: 1,
                        }}
                        itemTextStyle={{
                            color: 'blue.800',
                        }}
                        itemsContainerStyle={{ maxHeight: 140 }}
                        items={PROGRAMMING_LANGUAGES}
                        defaultIndex={0}
                        placeholder="Yazılım dili seçin"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                        textInputProps={{
                            value: selectedLanguage
                        }}
                    />
                </Box>
                <Box p="1" />
                <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                    <SearchableDropdown
                        onItemSelect={(item) => {
                            setselectedErrorType(item.name);
                            updateErrorType(item.name);
                        }}
                        containerStyle={{ padding: 5 }}
                        textInputStyle={{
                            fontSize: 15,
                            lineHeight: 18,
                            padding: 12,
                            borderWidth: 1,
                            borderColor: 'gray.500',
                            backgroundColor: '#FAF7F6',
                        }}
                        itemStyle={{
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#FAF9F8',
                            borderColor: 'gray.500',
                            borderWidth: 1,
                        }}
                        itemTextStyle={{
                            color: 'blue.800',
                        }}
                        itemsContainerStyle={{ maxHeight: 140 }}
                        items={ERROR_TYPES}
                        defaultIndex={0}
                        placeholder="Hata tipini seçiniz"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                        textInputProps={{
                            value: selectedErrorType
                        }}
                    />
                </Box>

                <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                    <TextInput
                        style={{
                            fontSize: 15,
                            lineHeight: 19,
                            padding: 12,
                        }}
                        value={newError.name}
                        maxLength={36}
                        placeholder="Hatanıza isim verin"
                        placeholderTextColor={theme.colors.gray5}
                        onChangeText={(text) => {
                            setNewError((prev) => ({
                                ...prev,
                                name: text,
                            }));
                        }}
                    />
                </Box>
                <Box bg="gray250" p="4" borderRadius="rounded-2xl" mb="4">
                    <Box
                        bg="white"
                        width={60}
                        p="2"
                        mb="4"
                        borderRadius="rounded-2xl"
                        alignItems="center"
                    >
                        <Text
                            variant="textXs"
                            fontWeight="600"
                            color={newError.color as keyof Theme['colors']}
                        >
                            Colors
                        </Text>
                    </Box>
                    <Box flexDirection="row" justifyContent="space-evenly">
                        {COLORS.map((_color: IColor) => (
                            <Pressable
                                key={_color.id}
                                onPress={() => {
                                    updateColor(_color);
                                }}
                            >
                                <Box
                                    style={{
                                        backgroundColor: _color.code,
                                    }}
                                    width={24}
                                    height={24}
                                    borderRadius="rounded-2xl"
                                ></Box>
                            </Pressable>
                        ))}
                    </Box>
                </Box>
                <Box mb="4">
                    <Button
                        label="Hata Ekle"
                        onPress={() => {
                            console.log('Button pressed'); // Bu satırı ekleyin
                            createNewError();
                        }}
                    />
                </Box>
            </Box>
        </SafeAreaWrapper>
    );
}


const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
    },
});

export default HomeScreen;



