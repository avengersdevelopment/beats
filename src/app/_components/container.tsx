"use client";

import Footer from "@/app/_components/footer";
import { useEffect, useState } from "react";
import PromptPage from "./prompt-page";
import ResultPage from "./result-page";
import { useUserStore } from "@/store/user-store";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export default function Container() {
  const { result, userId, setResult, setUserId } = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!userId && !storedUserId) {
      const uuid = uuidv4();
      setUserId(uuid);
      localStorage.setItem('userId', uuid);
    } else if (!userId && storedUserId) {
      setUserId(storedUserId);
    }
  }, [setUserId, userId]);

  return (
    <main className="h-screen w-full bg-[url('/assets/home/bg.webp')] bg-cover bg-center">
      {!result ? (
        <PromptPage
          onSubmit={() => {
            setIsLoading(true);
          }}
          onSubmitted={(musicUrl) => {
            setIsLoading(false);
            setResult(musicUrl);
          }}
          isLoading={isLoading}
        />
      ) : (
        <ResultPage
          key={result}
          onBack={() => setResult(null)}
          musicUrl={result}
        />
      )}

      <Image
        src={"/assets/home/deepseek-logo.png"}
        width={480}
        height={480}
        alt=""
        className="absolute bottom-[23vh] right-[30%] md:right-4 h-auto w-[40vw] md:w-[20vw]"
      />

      <Footer />
    </main>
  );
}
