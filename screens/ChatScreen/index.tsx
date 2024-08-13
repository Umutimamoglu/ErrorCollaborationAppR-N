import React from 'react';

import { useRoute, RouteProp } from '@react-navigation/native';
import { AllBugsStackParamList } from '../../navigation/types';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import { Box, Text } from '../../utils/theme';

type ChatScreenRouteProp = RouteProp<AllBugsStackParamList, 'ChatScreen'>;

const ChatScreen = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const { bug } = route.params;

    return (
        <SafeAreaWraper>
            <Box flex={1}>

                <Box>
                    <Text>
                        {bug.type}
                    </Text>
                </Box>



            </Box>

        </SafeAreaWraper>
    );
};

export default ChatScreen;