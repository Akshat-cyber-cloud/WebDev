import "dotenv/config";
import { tavily } from "@tavily/core";

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });
const res = await client.search("2026 Final Winner in World Baseball, Against USA vs Venezuela", { maxResults: 3 });
console.log(res.results);