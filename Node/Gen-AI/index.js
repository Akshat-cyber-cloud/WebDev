import "dotenv/config";
import readline from "readline/promises";

import { ChatMistralAI } from "@langchain/mistralai";
import { tool } from "@langchain/core/tools";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

import { sendEmail } from "./mail.service.js";
import { tavilyTool } from "./tavily.service.js";

import * as z from "zod";

// ─ Email tool 
const emailTool = tool(sendEmail, {
  name: "mailTool",
  description: "Use this tool to send emails",
  schema: z.object({
    to: z.string(),
    html: z.string(),
    subject: z.string(),
  }),
});

//  Model 
const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
  temperature: 0,
});

const tools = [emailTool, tavilyTool];

// Agent
const agent = createReactAgent({
  llm: model,
  tools,
  messageModifier: `You are a helpful assistant with access to real-time web search and email.
ALWAYS use the tavily_search tool for ANY question about:
- Current events, news, awards, sports results
- Anything that may have changed recently
- Any factual question requiring up-to-date information
NEVER answer time-sensitive questions from memory. Always search first.`,
});

// REPL loop with memory
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chatHistory = [];

while (true) {
  const userInput = await rl.question("\x1b[32mYou:\x1b[0m ");

  if (userInput.toLowerCase() === "exit") {
    console.log("Goodbye!");
    rl.close();
    process.exit(0);
  }

  const response = await agent.invoke({
    messages: [
      ...chatHistory,
      new HumanMessage(userInput),
    ],
  });

  const output = response.messages.at(-1).content;

  chatHistory.push(new HumanMessage(userInput));
  chatHistory.push(new AIMessage(output));

  console.log(`\x1b[34m[AI]\x1b[0m ${output}`);
}