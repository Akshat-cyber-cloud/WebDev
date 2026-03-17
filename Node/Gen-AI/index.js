import "dotenv/config"
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage, tool, createAgent} from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";

const emailTool = tool(
    sendEmail,
    {
        name: "mailTool",
        desc: "Use this tool to send mails",
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email"),
        })
    }
)

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// r1.question("What is your name?", (name) => {
//     console.log(`Hello ${name}`);
//     r1.close();
// });

const model = new ChatMistralAI({
    model: "mistral-small-latest",
})

const agent = createAgent({
    model,
    tools: [emailTool]
})

const messages = [];

while(true){
    const userInput = await r1.question("\x1b[32mYou:\x1b[0m ")
    messages.push(new HumanMessage(userInput));

    const response = await agent.invoke({
        messages
    });
    messages.push(response.messages[response.messages.length - 1]);

     console.log(`\x1b[34m[AI]\x1b[0m ${response.messages[ response.messages.length - 1 ].content}`)
}


