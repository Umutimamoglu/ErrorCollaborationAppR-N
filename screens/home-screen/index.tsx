import React, { useState } from 'react';
import { Pressable, TextInput, Image } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Box, Text, Theme } from '../../utils/theme';
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper';
import Button from '../../src/shared/button';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import axiosInstance, { BASE_URL } from '../../service/config';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { CreateError, ICreateErrorRequest, IColor } from '../../types';
import { launchImageLibrary } from 'react-native-image-picker';
import { getColors } from '../../utils/heplers';
import { CategoriesStackParamList } from '../../navigation/types';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component
import axios from 'axios';

const COLORS = getColors();
const PROGRAMMING_LANGUAGES = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'C#' },
    { id: 5, name: 'C++' },
];

const DEFAULT_COLOR = COLORS[0];
const DEFAULT_LANGUAGE = PROGRAMMING_LANGUAGES[0];

const CreateErrorRequest = async (
    url: string,
    { arg }: { arg: ICreateErrorRequest }
) => {
    try {
        console.log('Request payload:', arg); // Gönderilen veriyi kontrol edin
        const response = await axiosInstance.post(url, {
            ...arg,
        });
        console.log('Response:', response); // Yanıtı kontrol edin
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
    });

    const createNewError = async () => {
        console.log('createNewError called'); // Bu satırı ekleyin
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

    const pickImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            quality: 1,
        });

        if (result.assets && result.assets.length > 0) {
            const assets = result.assets;
            setNewError((prev) => ({
                ...prev,
                image: assets[0].uri,
            }));
        } else {
            console.log('No image selected or image selection cancelled.');
        }
    };

    return (
        <SafeAreaWrapper>
            <Box flex={1} mx="4" justifyContent="center">
                <Box height={16} />
                <Text variant="textXl" textAlign="center" mb="4">
                    Yeni hata oluştur!!!
                </Text>
                <Box alignItems="center" mb="14">
                    <Pressable onPress={pickImage}>
                        <Box
                            width={100}
                            height={100}
                            borderWidth={1}
                            borderStyle="dashed"
                            borderColor="blu900"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {newError.image ? (
                                <Image
                                    source={{ uri: newError.image }}
                                    style={{ width: 100, height: 100 }}
                                />
                            ) : (
                                <FontAwesomeIcon icon={faTrashCan} size={24} />
                            )}
                        </Box>
                    </Pressable>
                </Box>
                <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                    <Picker
                        selectedValue={newError.language}
                        onValueChange={(itemValue) => updateLanguage(itemValue)}
                        style={{
                            fontSize: 20,
                            lineHeight: 26,
                            padding: 16,
                            color: theme.colors.gray5,
                        }}
                    >
                        {PROGRAMMING_LANGUAGES.map((lang) => (
                            <Picker.Item key={lang.id} label={lang.name} value={lang.name} />
                        ))}
                    </Picker>
                </Box>
                <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                    <TextInput
                        style={{
                            fontSize: 20,
                            lineHeight: 26,
                            padding: 16,
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
                        width={64}
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

export default HomeScreen;