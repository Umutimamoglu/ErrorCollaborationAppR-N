import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import { Box } from '../../utils/theme'
import { Entypo } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AntDesign from '@expo/vector-icons/AntDesign';




const NavigateBack = () => {

    const navigation = useNavigation()
    const navigateBack = () => {
        navigation.goBack()
    }

    return (
        <Pressable onPress={navigateBack}>
            <Box mt="2" ml='3' mb='2'>
                <AntDesign name="arrowleft" size={24} color="black" />
            </Box>
        </Pressable>
    )
}

export default NavigateBack