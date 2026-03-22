import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import { addNewMessage, setChats, setCurrentChatId, setError, setLoading, createNewChat, setChatMessages } from "../chat.slice";
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true));
        try {
            const data = await sendMessage({ message, chatId });
            const { chat, aiMessage } = data;

            if (!chatId) {
                dispatch(createNewChat({
                    chatId: chat._id,
                    title: chat.title
                }));
                dispatch(addNewMessage({
                    chatId: chat._id,
                    content: message,
                    role: "user",
                }));
                dispatch(setCurrentChatId(chat._id));
            } else {
                dispatch(addNewMessage({
                    chatId: chat._id,
                    content: message,
                    role: "user",
                }));
            }

            dispatch(addNewMessage({
                chatId: chat._id,
                content: aiMessage.content,
                role: "ai",
            }));
        } catch (e) {
            dispatch(setError(e.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetChats() {
        dispatch(setLoading(true));
        try {
            const chatsData = await getChats();
            const chatsMap = {};
            chatsData.forEach(c => {
                chatsMap[c._id] = {
                    id: c._id,
                    title: c.title,
                    messages: c.messages ?? [],
                };
            });
            dispatch(setChats(chatsMap));
        } catch (e) {
            dispatch(setError(e.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleOpenChat(chatId, chats) {
        dispatch(setCurrentChatId(chatId));
        if (chats[chatId]?.messages?.length > 0) return;

        dispatch(setLoading(true));
        try {
            const messages = await getMessages({ chatId });
            dispatch(setChatMessages({ chatId, messages }));
        } catch (e) {
            dispatch(setError(e.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    function handleSetCurrentChatId(chatId) {
        dispatch(setCurrentChatId(chatId));
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleSetCurrentChatId,
    }
}