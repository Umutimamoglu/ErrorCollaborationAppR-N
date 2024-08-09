import React from 'react';
import { Pressable, View } from 'react-native';
import { IAllBugs } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { BugsNavigationType } from '../../navigation/types';
import { Box, Text } from '../../utils/theme';

type BugProps = {
    bug: IAllBugs
};

const AllBug = ({ bug }: BugProps) => {
    const navigation = useNavigation<BugsNavigationType>();

    const navigateToBugDetailScreen = () => {
        navigation.navigate("BugDetail", { bug });
    }

    // Tarih ve saati formatlamak için
    const formattedDate = new Date(bug.createdAt).toLocaleDateString();
    const formattedTime = new Date(bug.createdAt).toLocaleTimeString();

    return (
        <Pressable onPress={navigateToBugDetailScreen}>
            <Box height={100} style={{ backgroundColor: bug.color.code, padding: 13, borderRadius: 16 }}>
                <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Box flexDirection="row" style={{ padding: 1 }}>
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {bug.user.name}
                        </Text>
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {formattedDate} {/* Tarihi gösterir */}
                        </Text>
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {formattedTime} {/* Saati gösterir */}
                        </Text>
                    </Box>
                </Box>
                <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                    <Box flexDirection="row" style={{ padding: 1 }}>

                        <Text variant="textBase" fontWeight="600" mr="3">
                            {bug.language}
                        </Text>
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {bug.type}
                        </Text>
                        <Text variant="textBase" fontWeight="600" mr="3">
                            {bug.name}
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Pressable>
    )
}

export default AllBug;
