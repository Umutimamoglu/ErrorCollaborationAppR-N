import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, Button } from 'react-native';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import { Box, Text } from '../../utils/theme';
import axiosInstance from '../../service/config';
import useUserGlobalStore from '../../store/useUserGlobalStore';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AllBugsStackParamList } from '../../navigation/types';

interface Message {
    _id: string;
    sender: string;
    message: string;
    createdAt: string;
}

type ChatScreenRouteProp = RouteProp<AllBugsStackParamList, 'ChatScreen'>;

const ChatScreen = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const { bug } = route.params;  // Gönderilen bug nesnesi

    const { user } = useUserGlobalStore();
    const [chatId, setChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        const findOrCreateChat = async () => {
            if (user) {  // user null değilse devam et
                try {
                    // Var olan sohbeti bulma isteği
                    const response = await axiosInstance.get(`/api/chat/chat/${user._id}/${bug.user._id}`);

                    if (response.data) {
                        // Eğer sohbet mevcutsa, chatId'yi ayarla
                        setChatId(response.data._id);
                    } else {
                        // Eğer sohbet yoksa, yeni bir sohbet oluştur
                        const newChatResponse = await axiosInstance.post('/api/chat/chat', {
                            firstId: user._id,
                            secondId: bug.user._id,
                        });
                        setChatId(newChatResponse.data._id);
                    }
                } catch (error) {
                    console.error('Chat bulunurken veya oluşturulurken hata oluştu:', error);
                }
            }
        };

        findOrCreateChat();
    }, [user, bug]);

    useEffect(() => {
        if (chatId) {
            const fetchMessages = async () => {
                try {
                    const response = await axiosInstance.get(`/api/chat/messages/${chatId}`);
                    setMessages(response.data);
                } catch (error) {
                    console.error('Mesajlar alınırken hata oluştu:', error);
                }
            };

            fetchMessages();
        }
    }, [chatId]);

    const handleSendMessage = async () => {
        if (newMessage.trim() && user && chatId) {
            try {
                const response = await axiosInstance.post('/api/chat/message', {
                    chatId,
                    senderId: user._id,
                    message: newMessage,
                });
                setMessages([...messages, response.data]);
                setNewMessage('');
            } catch (error) {
                console.error('Mesaj gönderilirken hata oluştu:', error);
            }
        }
    };

    return (
        <SafeAreaWraper>
            <Box flex={1}>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <Box padding="4">
                            <Text>{item.message}</Text>
                            <Text variant="textLg" color="gray300">{item.createdAt}</Text>
                        </Box>
                    )}
                />
                <Box flexDirection="row" padding="2">
                    <TextInput
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Mesaj yazın"
                        style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 8 }}
                    />
                    <Button title="Gönder" onPress={handleSendMessage} />
                </Box>

                <Box bg="blu400">
                    <Text>
                        {bug.user._id}
                    </Text>
                </Box>
            </Box>
        </SafeAreaWraper>
    );
};

export default ChatScreen;
