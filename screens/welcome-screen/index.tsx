import { View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Text } from '../../utils/theme';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import Button from '../../src/shared/button';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from '../../navigation/types';
import { AntDesign } from '@expo/vector-icons';


const WelcomeScreen = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>()
    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp")
    }

    return (

        <SafeAreaWraper>
            <Box flex={1} bg="red500">
                <Box marginTop="13" alignItems='center'>
                    <MaterialIcons align name="error-outline" size={120} color="white" />
                </Box>

                <Box borderRadius="rounded-7xl" marginTop="20" width={380} height={500} bg="zinc400">
                    <Box mt='20' justifyContent='center' alignItems='center'>
                        <Text fontSize={20} fontWeight="500">
                            Let Fix in Your

                        </Text>
                        <Text fontSize={20} fontWeight="500">
                            Bug’s
                        </Text>
                        <Box >
                            <AntDesign name="check" size={30} color="green" />
                        </Box>

                    </Box>
                    <Box alignItems='center' mt='13'  >
                        <Button label='Go' onPress={navigateToSignUpScreen} />
                    </Box>
                </Box>

            </Box>

        </SafeAreaWraper>





    )
}

export default WelcomeScreen