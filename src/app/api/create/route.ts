import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import OpenAI from "openai";

interface GenerateRequestBody {
  input: {
    prompt: string;
    model_version: string;
    output_format: string;
    normalization_strategy: string;
    duration: number;
  };
}

interface MusicGenerationRequest {
  prompt: string;
  duration: number;
  genre?: string;
}

export interface MusicResponse {
  item_id: string;
  user_id: string;
  created_at: string;
  prompt: string;
  output: string;
  duration: number;
}

async function refinePromptWithOpenAI(
  prompt: string,
  genre?: string,
): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const genreContext = genre ? ` in the ${genre} genre` : "";

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content:
          "You are an expert at crafting high-quality prompts for AI music generation. Transform the given prompt into a more detailed and effective version that will produce better results. Output only the prompt and nothing else",
      },
      {
        role: "user",
        content: `Please enhance this music generation prompt${genreContext}.Make it maximum 20 words and make it more descriptive and specific while maintaining the original intent: "${prompt} "`,
      },
    ],
    max_tokens: 200,
  });

  return completion.choices[0].message.content || prompt;
}

export async function POST(request: NextRequest) {
  try {
    // Get and validate environment variables
    const replicateToken = process.env.NEXT_REPLICATE_KEY;
    const openaiToken = process.env.OPENAI_API_KEY;

    if (!replicateToken || !openaiToken) {
      return NextResponse.json(
        { error: "Required API tokens not set" },
        { status: 500 },
      );
    }

    // Parse and validate request body
    const requestData: MusicGenerationRequest = await request.json();
    const { prompt, duration = 12, genre } = requestData;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt cannot be empty" },
        { status: 400 },
      );
    }

    // Refine the prompt using OpenAI
    const refinedPrompt = await refinePromptWithOpenAI(prompt, genre);
    console.log(refinedPrompt);

    // Prepare request for Replicate
    const replicateUrl = "https://api.replicate.com/v1/deployments/avengersdevelopment/beats/predictions";
    const version =
      "671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb";

    const requestBody: GenerateRequestBody = {

      input: {
        prompt: refinedPrompt,
        model_version: "stereo-large",
        output_format: "mp3",
        normalization_strategy: "peak",
        duration: duration,
      },
    };

    // Make request to Replicate
    const response = await axios.post(replicateUrl, requestBody, {
      headers: {
        Authorization: `Token ${replicateToken}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      timeout: 180000,
    });

    // Return response with both the refined prompt and the Replicate response
    return NextResponse.json(
      {
        originalPrompt: prompt,
        refinedPrompt: refinedPrompt,
        ...response.data,
      },
      { status: response.status },
    );
  } catch (error: any) {
    console.error("Error in music generation:", error);
    return NextResponse.json(
      {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      },
      { status: error.response?.status || 500 },
    );
  }
}
