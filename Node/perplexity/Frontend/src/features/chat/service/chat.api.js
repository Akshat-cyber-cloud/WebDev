import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
})

export const sendMessage = async function* ({message, chatId}) {
    const response = await fetch("/api/chats/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({message, chatId}),
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to send message");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let leftover = "";

    while (true) {
        const {done, value} = await reader.read();
        if (done) break;

        const chunk = leftover + decoder.decode(value, {stream: true});
        const lines = chunk.split("\n\n");
        leftover = lines.pop();

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith("data: ")) {
                try {
                    const data = JSON.parse(trimmedLine.slice(6));
                    yield data;
                } catch (e) {
                    console.error("Error parsing SSE:", e);
                }
            }
        }
    }
}

export const getChats = async () => {
    const response = await api.get("/api/chats")
    return response.data;
}
export const getMessages = async ({chatId}) => {
    const response = await api.get(`/api/chats/${chatId}/messages`)
    return response.data;
}

export const deleteChat = async ({chatId}) => {
    const response = await api.delete(`/api/chats/delete/${chatId}`)
    return response.data;
}

