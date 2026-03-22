import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain"

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
})


export async function generateResponse(messages) {
  const formattedMessages = messages.map((msg) => {
    if (msg.role === "user") {
      return new HumanMessage(msg.content);
    } else if (msg.role === "ai") {
      return new AIMessage(msg.content);
    }
  }).filter(Boolean);

  const response = await geminiModel.invoke(formattedMessages);

  return response.content;
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`Generate a short, specific chat title in 3 to 6 words and return only the title.
        Rules:
- Keep the title concise, ideally 3 to 6 words.
- Capture the main topic or intent.
- Do not use quotes.
- Do not add punctuation unless necessary.
- Do not make it vague like "Chat" or "Discussion".
- Do not include filler words.
- Prefer natural, readable wording.
- Return only the title, nothing else.
        `),
      new HumanMessage(`
        Generate a title for a char conversation based on the following first message:
        "${message}"
        `)
  ])

  return response.content;
}

