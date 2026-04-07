import {config as dotenvConfig} from "dotenv"
dotenvConfig();

type CONFIG = {
    readonly GEMINI_API_KEY: string;
    readonly MISTRAL_API_KEY: string;
    readonly GROQ_API_KEY: string;
}

const config: CONFIG = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
}


export default config;