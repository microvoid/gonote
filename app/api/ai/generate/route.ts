import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { rateLimit } from "@/app/utils/rate-limit";

const config = new Configuration({
  basePath: process.env.OPENAI_BASE_PATH,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const limiter = rateLimit({
  interval: 24 * 60 * 60 * 1000,
});

export async function POST(req: Request): Promise<Response> {
  const ip = req.headers.get("x-forwarded-for");

  const { success, limit, remaining } = await limiter.check(
    50,
    `gonote_ratelimit_${ip}`
  );

  if (!success) {
    return new Response("You have reached your request limit for the day.", {
      status: 429,
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
      },
    });
  }

  let { prompt: content } = await req.json();

  content = content.replace(/\n/g, " ").replace(/\/$/, "").slice(0, 5000);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an AI writing assistant that continues existing text based on context from prior text. " +
          "Give more weight/priority to the later characters than the beginning ones. Make sure to construct complete sentences.",
      },
      {
        role: "user",
        content,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
