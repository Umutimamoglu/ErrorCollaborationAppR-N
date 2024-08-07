import React from 'react';
import { Pressable, View } from 'react-native';
import { IBug } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { BugsNavigationType } from '../../navigation/types';
import { Box, Text } from '../../utils/theme';

type BugProps = {
    bug: IBug
};

const Bug = ({ bug }: BugProps) => {
    const navigation = useNavigation<BugsNavigationType>();

    const navigateToBugDetailScreen = () => {
        navigation.navigate("BugDetail", { bug })
    }

    return (
        <Pressable onPress={navigateToBugDetailScreen}>
            <Box bg="zinc400" p="4" borderRadius="rounded-4xl">
                <Box flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box flexDirection="row" p="2">
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

export default Bug;
