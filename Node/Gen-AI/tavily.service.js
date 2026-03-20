import { tavily } from "@tavily/core";
import { tool } from "@langchain/core/tools";
import * as z from "zod";

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const tavilyTool = tool(
  async ({ query }) => {
    try {
      console.log(`\x1b[33m[Tavily Search]\x1b[0m Searching for: "${query}"`);

      const res = await client.search(query, {
        maxResults: 5,
        searchDepth: "advanced", 
        includeAnswer: true,  
      });

      const directAnswer = res.answer ? `Direct Answer: ${res.answer}\n\n` : "";

      const sources = res.results
        .map((r, i) => `[${i + 1}] ${r.title}\nURL: ${r.url}\n${r.content}`)
        .join("\n\n");

      return directAnswer + sources;
    } catch (err) {
      console.error("Tavily error:", err);
      return "Error fetching real-time data. Please try again.";
    }
  },
  {
    name: "tavily_search",
    description:
      "ALWAYS use this tool to search the internet for real-time information. Use it for: current events, news, sports results, awards, prices, weather, recent facts, or ANYTHING that may have changed or that you are not 100% sure about. Never answer factual or time-sensitive questions from memory.",
    schema: z.object({
      query: z.string().describe("A clear and specific search query"),
    }),
  }
);