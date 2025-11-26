import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createOuraTools } from "@/lib/oura-tools";
import { DEFAULT_MODEL } from "@/utils";

export async function POST(req: Request) {
  try {
    const { messages, ouraToken } = await req.json();

    if (!ouraToken) {
      return Response.json(
        { error: "Oura token is required" },
        { status: 400 }
      );
    }

    const ouraTools = createOuraTools({ accessToken: ouraToken });

    const result = streamText({
      model: openai(DEFAULT_MODEL),
      messages,
      tools: ouraTools,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
