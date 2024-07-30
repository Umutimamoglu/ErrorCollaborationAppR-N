import { FlatList, View } from 'react-native';
import React from 'react';
import useSWR from 'swr';
import { IBug } from '../../types';
import { fetcher } from '../../service/config';
import Loader from '../../src/shared/loader';
import Bug from '../../src/components/bug';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import { Box, Text } from '../../utils/theme';

const MyBugsScreen = () => {
    const { data, isLoading, error } = useSWR<IBug[]>(
        "api/errors/getMyErrors",
        fetcher, {
        refreshInterval: 10000, // 10 saniye olarak değiştirildi
    });

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error('Error fetching data:', error);
        return (
            <SafeAreaWraper>
                <Box flex={1} px="4" justifyContent="center" alignItems="center">
                    <Text variant="textLg" fontWeight="700" mb="10" color="blu900">
                        Failed to load bugs. Please try again later.
                    </Text>
                </Box>
            </SafeAreaWraper>
        );
    }

    const renderItem = ({ item }: { item: IBug }) => (
        <Bug bug={item} />
    );

    return (
        <SafeAreaWraper>
            <Box flex={1} px="4">
                <Text variant="textLg" fontWeight="700" mb="10">
                    My ALL Bugs
                </Text>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <Box height={14} />}
                    keyExtractor={(item) => item._id}
                />
            </Box>
        </SafeAreaWraper>
    );
};

export default MyBugsScreen;
