import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeAreaWraper from '../../src/shared/safe-area-wrapper'
import { Box } from '../../utils/theme'

const HomeScreen = () => {
    return (
        <SafeAreaWraper>
            <Box>
                <Text> Home </Text>
            </Box>
        </SafeAreaWraper>
    )
}

export default HomeScreen