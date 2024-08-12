import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { BugsStackParamList } from '../../navigation/types';
import { Box, Text } from '../../utils/theme';
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper';
import Button from '../../src/shared/button';


type BugDetailRouteProp = RouteProp<BugsStackParamList, 'BugDetail'>;

const BASE_URL = 'http://192.168.1.102:1337/';


const AllBugDetail = () => {
    const route = useRoute<BugDetailRouteProp>();
    const { bug } = route.params;


    console.log('Gelen resim dosya yolu:', bug.image ? `${BASE_URL}${bug.image}` : 'Resim bulunamadı');

    return (
        <SafeAreaWrapper>
            <Box bg="zinc400" flex={1}>
                <Box flex={1} mx="1" >


                    <Text variant="textXl" textAlign="center" mb="4">
                        Hata Detayları
                    </Text>
                    {bug.image ? (
                        <Box alignItems="center" mb="2">
                            <Image
                                source={{ uri: `${BASE_URL}${bug.image}` }}
                                style={styles.image}
                                onError={() => console.warn('Resim yüklenemedi, varsayılan kullanılacak')}
                            />
                        </Box>
                    ) : (
                        <Box alignItems="center" mb="2">
                            <Text>Resim Bulunamadı</Text>
                        </Box>
                    )}
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
                                alignSelf: 'flex-start',  // Bu satırı ekledim
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
                                alignSelf: 'flex-start',  // Bu satırı ekledim
                            }}
                        >
                            {bug.howDidIFix}
                        </Text>
                    </Box>

                    <Box mt="14" alignItems='center'>
                        <Button
                            label="Mesaj Gonder"
                            onPress={() => { /* Geri butonu işlemi buraya */ }}
                        />
                    </Box>
                    <Box mt="5" alignItems='center'>
                        <Button
                            label="Listeme Ekle"
                            onPress={() => { /* Geri butonu işlemi buraya */ }}
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
