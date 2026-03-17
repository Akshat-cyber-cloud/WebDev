import "dotenv/config"
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage} from "langchain";

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

const messages = [];

while(true){
    const userInput = await r1.question("\x1b[32mYou:\x1b[0m ")
    messages.push(new HumanMessage(userInput));

    const response = await model.invoke(messages);
    messages.push(response);

    console.log("AI: " + response.text);
}


