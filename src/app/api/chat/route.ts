import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { createOuraTools } from '@/lib/oura-tools';

export async function POST(req: Request) {
  try {
    const { messages, ouraToken } = await req.json();

    if (!ouraToken) {
      return Response.json({ error: 'Oura token is required' }, { status: 400 });
    }

    const ouraTools = createOuraTools({ accessToken: ouraToken });

    const result = await generateText({
      model: openai('gpt-4'),
      messages,
      tools: ouraTools,
      maxToolRoundtrips: 5,
    });

    return Response.json({ message: result.text });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}