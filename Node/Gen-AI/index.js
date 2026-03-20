import "dotenv/config";
import readline from "readline/promises";

import { ChatMistralAI } from "@langchain/mistralai";
import { tool } from "@langchain/core/tools";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

import { sendEmail } from "./mail.service.js";
import { tavilyTool } from "./tavily.service.js";

import * as z from "zod";
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
  tool_choice: "auto", // "auto" lets Mistral decide smartly; change to "any" to FORCE a tool call every time
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
- After searching, summarize the results clearly and cite sources where helpful.
- Today's date: ${new Date().toDateString()}`,
});


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chatHistory = [];

console.log("\x1b[36m╔══════════════════════════════════════╗\x1b[0m");
console.log("\x1b[36m║   AI Agent with Web Search & Email   ║\x1b[0m");
console.log("\x1b[36m╚══════════════════════════════════════╝\x1b[0m");
console.log('Type \x1b[31m"exit"\x1b[0m to quit.\n');

while (true) {
  const userInput = await rl.question("\x1b[32mYou:\x1b[0m ");

  if (!userInput.trim()) continue;

  if (userInput.trim().toLowerCase() === "exit") {
    console.log("\nGoodbye! 👋");
    rl.close();
    process.exit(0);
  }

  try {
    const response = await agent.invoke({
      messages: [
        ...chatHistory,
        new HumanMessage(userInput),
      ],
    });

    // Extract the final text output from the last message
    const lastMessage = response.messages.at(-1);
    const output =
      typeof lastMessage.content === "string"
        ? lastMessage.content
        : lastMessage.content
            .filter((c) => c.type === "text")
            .map((c) => c.text)
            .join("");

    // Save to memory
    chatHistory.push(new HumanMessage(userInput));
    chatHistory.push(new AIMessage(output));

    console.log(`\n\x1b[34m[AI]\x1b[0m ${output}\n`);
  } catch (err) {
    console.error("\x1b[31m[Error]\x1b[0m", err.message);
  }
}