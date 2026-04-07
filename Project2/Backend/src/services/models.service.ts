import {ChatGoogle} from "@langchain/google";
import {ChatMistralAI} from "@langchain/mistralai"; 
import { ChatGroq } from "@langchain/groq";
import config from "../config/config.js";

export const geminiModel = new ChatGoogle({
    model: "gemini-flash-latest",
    apiKey: config.GEMINI_API_KEY
});

export const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: config.MISTRAL_API_KEY
});

export const groqModel = new ChatGroq({
  apiKey: config.GROQ_API_KEY,
  model: "llama-3.1-8b-instant", 
});