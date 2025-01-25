import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

interface GenerateRequestBody {
  version: string;
  input: {
    prompt: string;
    model_version: string;
    output_format: string;
    normalization_strategy: string;
  };
}

export interface GenerateResponse {
  id: string;
  prompt: string;
  output: string;
}

export async function POST(request: NextRequest) {
  const url = "https://api.replicate.com/v1/predictions";
  const version =
    "671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb";
  const modelVersion = "stereo-large";
  const outputFormat = "mp3";
  const normalizationStrategy = "peak";

  const token = process.env.NEXT_REPLICATE_KEY;
  if (!token) {
    return NextResponse.json(
      { error: "API Token not set yet" },
      { status: 500 },
    );
  }

  const { prompt }: { prompt: string } = await request.json();
  if (!prompt) {
    return NextResponse.json(
      { error: "Prompt cannot be empty" },
      { status: 400 },
    );
  }

  const requestBody: GenerateRequestBody = {
    version: version,
    input: {
      prompt: prompt,
      model_version: modelVersion,
      output_format: outputFormat,
      normalization_strategy: normalizationStrategy,
    },
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
    });

    const responseData = response.data;
    const mappedData: GenerateResponse = {
      id: responseData.id,
      prompt: responseData.input.prompt,
      output: responseData.output,
    };

    return NextResponse.json(mappedData, { status: response.status });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.response.data },
      { status: e.response?.status || 500 },
    );
  }
}
