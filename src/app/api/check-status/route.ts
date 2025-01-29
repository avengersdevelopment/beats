import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    // Get and validate environment variables
    const replicateToken = process.env.NEXT_REPLICATE_KEY;

    if (!replicateToken) {
      return NextResponse.json(
        { error: "Required API tokens not set" },
        { status: 500 },
      );
    }

    const { statusUrl }: { statusUrl: string } = await request.json();
    const response = await axios.get(statusUrl, {
      headers: {
        Authorization: `Bearer ${replicateToken}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
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
