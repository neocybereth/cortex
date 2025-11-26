import { createOpenRouter } from "@openrouter/ai-sdk-provider"; // New import
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { createOuraTools } from "@/lib/oura-tools";
import { DEFAULT_MODEL } from "@/utils";

export const maxDuration = 30;

const openrouter = createOpenRouter({
  // Updated: Use createOpenRouter
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { messages }: { messages: UIMessage[] } = body;

    console.log("[Chat API] Request body:", JSON.stringify(body, null, 2));
    console.log("[Chat API] Messages:", messages);

    const ouraToken = process.env.OURA_ACCESS_TOKEN;

    if (!ouraToken) {
      console.error("[Chat API] No Oura token provided in environment");
      return Response.json(
        { error: "Oura token is not configured" },
        { status: 500 }
      );
    }

    const ouraTools = createOuraTools({ accessToken: ouraToken });

    // Get current date for the AI to use
    const today = new Date().toISOString().split("T")[0];

    const result = streamText({
      model: openrouter(DEFAULT_MODEL), // No change here, but now it's fully compatible
      system: `You are Cortex, an AI assistant that helps users understand their Oura Ring health data. 
Today's date is ${today}. When users ask about recent data (like "this week" or "yesterday"), calculate the appropriate dates based on today's date.
Always use YYYY-MM-DD format for dates when calling the Oura tools.
Provide insights and interpretations of the data in a helpful, conversational way.`,
      messages: convertToModelMessages(messages),
      temperature: 0.5,
      tools: ouraTools,
      onError: (error) => {
        console.log("[Chat API] ERRORRRRR:", error);
      },
      onFinish: ({ text }) => {
        console.log("Full streamed response:", text);
      },
    });
    return result.toUIMessageStreamResponse(); // No change
  } catch (error) {
    console.error("[Chat API] Error:", error);
    console.error(
      "[Chat API] Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
