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

  const handleSubmit = async () => {
    if (!prompt) return;

    try {
      onSubmit();

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      const data: MusicResponse = {
        user_id: userId || "",
        item_id: responseData.id,
        created_at: responseData.created_at,
        prompt: responseData.input.prompt,
        duration: responseData.input.duration,
        output: responseData.output,
      };

      await supabase.from("library").insert(data);
      onSubmitted(data.output);
    } catch (error) {
      console.error("Error submitting prompt:", error);
      onSubmitted(null);
    }
  };

  return (
    <section className="relative flex h-[80vh] w-full justify-center">
      <div className="flex h-full w-[55vw] flex-col items-center justify-center">
        <p
          className="text-[8vw] text-white drop-shadow-[0_5px_#C2A2FF]"
          style={{ WebkitTextStroke: "0.05vw", WebkitTextStrokeColor: "black" }}
        >
          BEATS
        </p>

        <p
          className="mb-[2vw] w-full text-center text-[2vw] text-white drop-shadow-[0_5px_#402F5C]"
          style={{ WebkitTextStroke: "0.05vw", WebkitTextStrokeColor: "black" }}
        >
          PLEASE <span className="text-[#C2A2FF]">TYPE</span> THE TEXTFIELD
          BELOW TO GENERATE
        </p>

        <div className="relative flex h-[8vh] w-full items-center gap-[2vw]">
          <Image
            src={"/assets/home/icon-music.png"}
            width={480}
            height={480}
            alt=""
            className="absolute -left-[2.5vw] -top-[2.5vw] h-auto w-[5vw]"
          />

          <input
            className="h-full w-full border-[0.1vw] border-[#D7D7D7] bg-[#D9D9D9]/15 p-[1vw] text-[1vw] text-white placeholder:text-white focus:outline-none"
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
              className="h-auto w-[3vw] animate-spin"
            />
          ) : (
            <Image
              src={"/assets/home/btn-submit.png"}
              width={480}
              height={480}
              alt=""
              className="h-auto w-[5vw] cursor-pointer"
              onClick={handleSubmit}
            />
          )}
        </div>
        {/* <div className="mt-5 flex w-full flex-row gap-5">
          <div className="w-[60%] border-[0.1vw] border-[#D7D7D7] bg-[#D9D9D9]/15 p-[1vw]">
            <SliderDuration />
          </div>
          <div className="">
            <DropdownGenre />
          </div>
        </div> */}
      </div>
    </section>
  );
}
