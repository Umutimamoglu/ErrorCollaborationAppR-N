import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import { Box } from '../../utils/theme'
import { Entypo } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';




const NavigateBack = () => {

    const navigation = useNavigation()
    const navigateBack = () => {
        navigation.goBack()
    }

    return (
        <Pressable onPress={navigateBack}>
            <Box mt="2" bg="gray100" borderRadius="rounded-7xl">
                <Entypo name="chevron-small-left" size={40} color="black" />
            </Box>
        </Pressable>
    )
}

export default NavigateBack