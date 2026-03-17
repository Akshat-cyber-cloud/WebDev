import { tavily } from "@tavily/core";
import { tool } from "@langchain/core/tools";
import * as z from "zod";

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const tavilyTool = tool(
  async ({ query }) => {
    try {
      const res = await client.search(query, { maxResults: 3 });

      return res.results
        .map(r => `${r.title}\n${r.url}\n${r.content}`)
        .join("\n\n");

    } catch (err) {
      console.error("Tavily error:", err);
      return "Error fetching real-time data";
    }
  },
  {
    name: "tavily_search",
    description: "Use this tool for real-time data, latest news, current events, or anything that may have changed recently.",
    schema: z.object({
      query: z.string().describe("Search query"),
    }),
  }
);