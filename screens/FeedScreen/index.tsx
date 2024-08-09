import React, { useState } from 'react';
import { View, FlatList, TextInput, Pressable } from 'react-native';
import useSWR from 'swr';
import { IAllBugs } from '../../types';
import { fetcher } from '../../service/config';
import AllBug from '../../src/components/allBug';  // allBug bileşenini doğru import edin
import { Box, Text } from '../../utils/theme';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const FeedScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { data, isLoading, error } = useSWR<IAllBugs[]>(
        "api/errors/getAllErrors",
        fetcher, {
        refreshInterval: 10000, // 10 saniyede bir veri yenileme
    });

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    const filteredData = data?.filter(bug =>
        bug.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bug.language.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: IAllBugs }) => (
        <AllBug bug={item} />  // allBug bileşenini JSX'te bu şekilde kullanın
    );

    return (
        <SafeAreaWraper>
            <Box bg="zinc400" flex={1}>
                <Text variant="textLg" textAlign='center' mt="10" mb="12">
                    Hata Akış
                </Text>

                {/* Arama çubuğu */}
                <Box flexDirection="row" bg="zinc400" px="4" alignItems="center">
                    <FontAwesome5 name="search" size={20} color="gray" />
                    <TextInput
                        style={{
                            flex: 1,
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            marginLeft: 10,
                            paddingLeft: 10,
                        }}
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                    />
                </Box>

                <Box ml="6" mr="6" mt="4">
                    <FlatList
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        ItemSeparatorComponent={() => <Box height={14} />} // Her öğe arasına boşluk eklemek için
                    />
                </Box>
            </Box>
        </SafeAreaWraper>
    );
};

export default FeedScreen;
