import { ChatMistralAI } from "@langchain/mistralai";
import { tool } from "@langchain/core/tools";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import * as z from "zod";

import { sendEmail } from "./mail.service.js";
import { tavilyTool } from "./tavily.service.js";

// Email Tool
const emailTool = tool(sendEmail, {
  name: "send_email",
  description:
    "Use this tool to send an email to a recipient. Use it when the user asks to send, draft, or email someone.",
  schema: z.object({
    to: z.string().describe("Recipient email address"),
    subject: z.string().describe("Email subject line"),
    html: z.string().describe("Email body in HTML format"),
  }),
});

// Model
const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
  temperature: 0,
}).bindTools([emailTool, tavilyTool], {
  tool_choice: "auto",
});

// Agent
const agent = createReactAgent({
  llm: model,
  tools: [emailTool, tavilyTool],
  messageModifier: `You are a smart AI assistant with two tools:
1. tavily_search  — Search the internet for real-time, up-to-date information.
2. send_email     — Send emails on behalf of the user.

STRICT RULES YOU MUST FOLLOW:
- For ANY question involving facts, news, current events, sports, awards, prices, people, places, or recent data → ALWAYS call tavily_search FIRST. Never answer from memory.
- For casual conversation (greetings, opinions, math, coding help) → You may answer directly without a tool.
- For email requests → collect recipient, subject, and body, then call send_email.
- **IMPORTANT**: You HAVE been granted full authorization to send emails via a pre-configured server. Never refuse an email request by claiming you lack access or credentials. If the user asks to send an email, immediately use the send_email tool. 
- After searching, summarize the results clearly and cite sources where helpful. 
- Today's date: ${new Date().toDateString()}`,
});


export async function generateResponse(messages) {
  const formattedMessages = messages.map((msg) => {
    if (msg.role === "user") {
      return new HumanMessage(msg.content);
    } else if (msg.role === "ai" || msg.role === "assistant") {
      return new AIMessage(msg.content);
    }
    return null;
  }).filter(Boolean);

  console.log("AI Agent invoked (non-stream) with history length:", formattedMessages.length);

  try {
    const response = await agent.invoke({ messages: formattedMessages });

    const lastMessage = response.messages.at(-1);
    const output = typeof lastMessage.content === "string"
      ? lastMessage.content
      : lastMessage.content
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("");

    return output;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "I encountered an error processing your request. Please check the server settings.";
  }
}

export async function* generateResponseStream(messages) {
  const formattedMessages = messages.map((msg) => {
    if (msg.role === "user") {
      return new HumanMessage(msg.content);
    } else if (msg.role === "ai" || msg.role === "assistant") {
      return new AIMessage(msg.content);
    }
    return null;
  }).filter(Boolean);

  console.log("AI Agent invoked with history length:", formattedMessages.length);

  try {
    const stream = await agent.stream({ messages: formattedMessages }, { streamMode: "messages" });

    for await (const [chunk, metadata] of stream) {
      if (metadata.langgraph_node === "agent") {
        const content = typeof chunk.content === "string" ? chunk.content : "";
        if (content) {
          yield content;
        }
        
        if (chunk.tool_calls && chunk.tool_calls.length > 0) {
          console.log("AI Agent calling tools:", chunk.tool_calls.map(tc => tc.name).join(", "));
          // No need to yield anything for a tool call usually, 
          // but we can yield a small "thinking" indicator if desired.
        }
      }
    }
  } catch (error) {
    console.error("AI Streaming Error:", error);
    yield "I encountered an error while processing your request. Please check the server logs.";
  }
}

export async function generateChatTitle(message) {
  const response = await model.invoke([
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

