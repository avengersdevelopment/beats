"use client";

import Image from "next/image";
import { useState } from "react";
import { MusicResponse } from "../api/generate/route";
import DropdownGenre from "./dropdown-genre";
import SliderDuration from "./slider-duration";
import { createClient } from "@/utils/supabase/client";
import { useUserStore } from "@/store/user-store";

interface PromptPageProps {
  onSubmit: () => void;
  onSubmitted: (prompt: string | null) => void;
  isLoading: boolean;
}
export default function PromptPage({
  onSubmit,
  isLoading,
  onSubmitted,
}: PromptPageProps) {
  const supabase = createClient();
  const { userId } = useUserStore();

  const [prompt, setPrompt] = useState<string>("");
  const [duration, setDuration] = useState<number>(12);
  const [genre, setGenre] = useState<string>("");

  const handleSubmit = async () => {
    if (!prompt) return;

    try {
      onSubmit();

      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          duration: duration,
          genre: genre,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      const status = await checkStatus({ statusUrl: responseData.urls.get });
      if (status) {
        const data: MusicResponse = {
          user_id: userId || "",
          item_id: responseData.id,
          created_at: responseData.created_at,
          prompt: responseData.originalPrompt,
          duration: responseData.input.duration,
          output: responseData.output,
        };

        await supabase.from("library").insert(data);
        onSubmitted(data.output);
      }
    } catch (error) {
      console.error("Error submitting prompt:", error);
      onSubmitted(null);
    }
  };

  async function checkStatus({ statusUrl }: { statusUrl: string }) {
    const maxAttempts = 30;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const response = await fetch("/api/check-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ statusUrl }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.status === "succeeded") {
        return true;
      }

      // Wait 500 milliseconds before next attempt
      await new Promise((resolve) => setTimeout(resolve, 500));
      attempts++;
    }

    throw new Error("Timeout waiting for generation to complete");
  }

  return (
    <section className="relative flex h-[80vh] w-full justify-center">
      <div className="flex h-full w-[80vw] flex-col items-center justify-center md:w-[55vw]">
        <p
          className="mb-4 text-6xl text-white drop-shadow-[0_5px_#C2A2FF] md:mb-8 md:text-[8vw]"
          style={{ WebkitTextStroke: "0.05vw", WebkitTextStrokeColor: "black" }}
        >
          BEATS
        </p>

        <p
          className="mb-8 w-full text-center text-xs text-white drop-shadow-[0_5px_#402F5C] md:mb-[2vw] md:text-[2vw]"
          style={{
            WebkitTextStroke: "0.05vw",
            WebkitTextStrokeColor: "black",
            lineHeight: 1,
          }}
        >
          PLEASE <span className="text-[#C2A2FF]">TYPE</span> THE TEXTFIELD
          BELOW TO GENERATE
        </p>

        <div className="relative mb-[2vw] flex w-full items-center gap-[2vw] md:h-[8vh]">
          <Image
            src={"/assets/home/icon-music.png"}
            width={480}
            height={480}
            alt=""
            className="absolute -left-[2.5vw] -top-[2.5vw] h-auto w-[5vw]"
          />

          <input
            className="h-full w-full border-[0.1vw] border-[#D7D7D7] bg-[#D9D9D9]/15 p-[1vw] text-[8px] text-white placeholder:text-white focus:outline-none md:text-[1vw]"
            placeholder="TYPE YOUR MUSIC PREFERENCE..."
            onChange={(e) => {
              if (e.target.value) {
                setPrompt(e.target.value);
              }
            }}
          />

          {isLoading ? (
            <Image
              src={"/assets/home/icon-loading.png"}
              width={480}
              height={480}
              alt=""
              className="h-auto w-[6vw] animate-spin md:w-[3vw]"
            />
          ) : (
            <Image
              src={"/assets/home/btn-submit.png"}
              width={480}
              height={480}
              alt=""
              className="h-auto w-[8vw] cursor-pointer md:w-[5vw]"
              onClick={handleSubmit}
            />
          )}
        </div>

        <div className="flex w-full items-center justify-center gap-[2.5vw]">
          <div className="flex w-full gap-[1.5vw]">
            <SliderDuration
              duration={duration}
              onChange={(duration) => setDuration(duration)}
            />

            <DropdownGenre
              genre={genre}
              onChange={(genre) => setGenre(genre)}
            />
          </div>

          <div className="w-[5vw]" />
        </div>
      </div>
    </section>
  );
}
