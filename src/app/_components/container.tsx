"use client";

import Footer from "@/app/_components/footer";
import { useEffect, useState } from "react";
import PromptPage from "./prompt-page";
import ResultPage from "./result-page";
import { useUserStore } from "@/store/user-store";
import { v4 as uuidv4 } from "uuid";

export default function Container() {
  const { result, userId, setResult, setUserId } = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) {
      const uuid = uuidv4();
      setUserId(uuid);
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

      <Footer />
    </main>
  );
}
