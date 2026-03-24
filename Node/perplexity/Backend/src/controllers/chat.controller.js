import { generateResponse, generateChatTitle, generateResponseStream } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"

export async function sendMessage(req, res) {
    const { message, chatId } = req.body;

    let title = null, chat = null;

    if (!chatId) {
        title = await generateChatTitle(message);
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    }
    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    })

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.write(`data: ${JSON.stringify({
        type: "chat_info",
        chatId: chatId || chat._id,
        title: title || (await chatModel.findById(chatId))?.title
    })}\n\n`);


    const messages = await messageModel.find({chat: chatId || chat._id});
    const stream = generateResponseStream(messages);

    let fullContent = "";
    for await (const chunk of stream) {
        fullContent += chunk;
        res.write(`data: ${JSON.stringify({ type: "chunk", content: chunk })}\n\n`);
    }


    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: fullContent,
        role: "ai"
    })

    res.write(`data: ${JSON.stringify({ type: "done", aiMessage })}\n\n`);
    res.end();
}

export async function getChats(req,res){
    const user = req.user;
    const chats = await  chatModel.find({user: user.id});

    res.status(200).json({
        message: "Chats Retrieved Successfully",
        chats
    })
}

export async function getMessages(req,res){
    const {chatId} = req.params;

    const chat  = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message: "Chat not Found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
        message: "Messages Retrieved Successfully",
        messages
    })
}

export async function deleteChat(req,res) {
    const {chatId} = req.params;

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if(!chat){
        return res.status(404).json({
            message: "Chat Not Found"
        })
    }

    res.status(200).json({
        message: "Chat Deleted Successfully"
    })
}