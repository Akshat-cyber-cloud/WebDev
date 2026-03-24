import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import { addNewMessage, setChats, setCurrentChatId, setError, setLoading, createNewChat, setChatMessages, updateLastAiMessage, deleteChatAction } from "../chat.slice";
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true));
        try {
            const stream = sendMessage({ message, chatId });
            let workingChatId = chatId;
            let aiMessageAdded = false;

            for await (const data of stream) {
                if (data.type === "chat_info") {
                    if (!chatId) {
                        dispatch(createNewChat({
                            chatId: data.chatId,
                            title: data.title
                        }));
                        dispatch(setCurrentChatId(data.chatId));
                    }
                    workingChatId = data.chatId;
                    dispatch(addNewMessage({
                        chatId: workingChatId,
                        content: message,
                        role: "user",
                    }));
                } else if (data.type === "chunk") {
                    if (!aiMessageAdded) {
                        dispatch(addNewMessage({
                            chatId: workingChatId,
                            content: "",
                            role: "ai",
                        }));
                        aiMessageAdded = true;
                    }
                    dispatch(updateLastAiMessage({
                        chatId: workingChatId,
                        content: data.content
                    }));
                }
            }
        } catch (e) {
            dispatch(setError(e.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetChats() {
        dispatch(setLoading(true));
        try {
            const data = await getChats();
            const chatsData = data.chats || [];
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
            const data = await getMessages({ chatId });
            const messages = data.messages || [];
            dispatch(setChatMessages({ chatId, messages }));
        } catch (e) {
            dispatch(setError(e.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleDeleteChat(chatId) {
        dispatch(setLoading(true));
        try {
            await deleteChat({ chatId });
            dispatch(deleteChatAction(chatId));
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
        handleDeleteChat
    }
}