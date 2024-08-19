import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { AllBugsNavigationType, AllBugsStackParamList } from '../../navigation/types';
import { Box, Text } from '../../utils/theme';
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axiosInstance, { BASE_URL } from '../../service/config';
import Button from '../../src/shared/button';

type BugDetailRouteProp = RouteProp<AllBugsStackParamList, 'AllBugDetail'>;



const AllBugDetail = () => {

    const route = useRoute<BugDetailRouteProp>();
    const { bug } = route.params;


    const navigation = useNavigation<AllBugsNavigationType>();

    const navigateToAllBugChatScreen = () => {
        navigation.navigate("ChatScreen", { bug });
    }


    const [pressed, setPressed] = useState(false);

    const addToFavorites = async () => {
        try {
            const data = {
                name: bug.name,
                isFixed: bug.isFixed,
                image: bug.image ? `${BASE_URL}${bug.image}` : null,
                color: {
                    id: bug.color.id,
                    name: bug.color.name,
                    code: bug.color.code
                },
                language: bug.language,
                type: bug.type,
                howDidIFix: bug.howDidIFix || ''
            };

            await axiosInstance.post('/api/errors/addToFavorites', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            Alert.alert("Başarıyla eklendi", "Hata favorilere eklendi!");
        } catch (error) {
            console.error('Error adding to favorites:', error.response?.data || error.message);
            Alert.alert("Hata", "Favorilere eklerken bir hata oluştu.");
        }
    };


    return (
        <SafeAreaWrapper>
            <Box bg="zinc400" flex={1}>
                <Box flex={1} mx="1">
                    <Text variant="textXl" textAlign="center" mb="4">
                        Hata Detayları
                    </Text>
                    <Box justifyContent="space-around" flexDirection="row">
                        {bug.image ? (
                            <Box ml="20" alignItems="center" mb="2">
                                <Image
                                    source={{ uri: `${axiosInstance.defaults.baseURL}/${bug.image}` }}
                                    style={styles.image}
                                    onError={() => console.warn('Resim yüklenemedi, varsayılan kullanılacak')}
                                />
                            </Box>
                        ) : (
                            <Box alignItems="center" mb="2">
                                <Text>Resim Bulunamadı</Text>
                            </Box>
                        )}
                        <Pressable
                            onPressIn={() => setPressed(true)}
                            onPressOut={() => setPressed(false)}
                            onPress={addToFavorites}
                            style={({ pressed }) => [
                                {
                                    opacity: pressed ? 0.6 : 1,
                                },
                            ]}
                        >
                            <Box>
                                <FontAwesome name="heart-o" size={24} color="black" />
                            </Box>
                        </Pressable>
                    </Box>
                    <Box ml='5' mr="5" bg="gray250" borderRadius="rounded-2xl" mb="4">
                        <Text
                            style={{
                                fontSize: 15,
                                lineHeight: 19,
                                padding: 12,
                            }}
                        >
                            {bug.language}
                        </Text>
                    </Box>
                    <Box ml='5' mr="5" bg="gray250" borderRadius="rounded-2xl" mb="4">
                        <Text
                            style={{
                                fontSize: 15,
                                lineHeight: 19,
                                padding: 12,
                                alignSelf: 'flex-start',
                            }}
                        >
                            {bug.name}
                        </Text>
                    </Box>
                    <Box ml='5' mr="5" bg="gray250" borderRadius="rounded-2xl" mb="4">
                        <Text
                            style={{
                                fontSize: 15,
                                lineHeight: 19,
                                padding: 12,
                                alignSelf: 'flex-start',
                            }}
                        >
                            {bug.howDidIFix}
                        </Text>
                    </Box>
                    <Box mt="14" alignItems='center'>
                        <Button
                            label="Mesaj Gonder"
                            onPress={navigateToAllBugChatScreen}
                        />
                    </Box>
                </Box>
            </Box>
        </SafeAreaWrapper>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
});

export default AllBugDetail;
