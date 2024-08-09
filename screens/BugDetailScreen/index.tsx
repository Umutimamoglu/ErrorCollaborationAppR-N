import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { BugsStackParamList } from '../../navigation/types';
import { Box, Text } from '../../utils/theme';
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper';
import Button from '../../src/shared/button';

type BugDetailRouteProp = RouteProp<BugsStackParamList, 'BugDetail'>;

const BASE_URL = 'http://192.168.1.102:1337/';


const BugDetailScreen = () => {
    const route = useRoute<BugDetailRouteProp>();
    const { bug } = route.params;


    console.log('Gelen resim dosya yolu:', bug.image ? `${BASE_URL}${bug.image}` : 'Resim bulunamadı');

    return (
        <SafeAreaWrapper>
            <Box flex={1} mx="6" justifyContent="center">
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
                <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                    <Text
                        style={{
                            fontSize: 15,
                            lineHeight: 19,
                            padding: 12,
                        }}
                    >
                        {bug.name}
                    </Text>
                </Box>
                <Box bg="gray250" borderRadius="rounded-2xl" mb="4">
                    <Text
                        style={{
                            fontSize: 15,
                            lineHeight: 19,
                            padding: 12,
                        }}
                    >
                        {bug.howDidIFix}
                    </Text>
                </Box>
                <Box flexDirection="row" alignItems="center" mb="4">
                    <Text mr="3">is-Fixed:</Text>
                    <Text>{bug.isFixed ? "Evet" : "Hayır"}</Text>
                </Box>
                <Box mb="1" alignItems='center'>
                    <Button
                        label="Geri"
                        onPress={() => { /* Geri butonu işlemi buraya */ }}
                    />
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

export default BugDetailScreen;
