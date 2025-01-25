"use client";

import Footer from "@/app/_components/footer";
import { useState } from "react";
import PromptPage from "./prompt-page";
import ResultPage from "./result-page";

export default function Container() {
  const [result, setResult] = useState<string | null>("asd");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        <ResultPage key={result} onBack={() => setResult(null)} musicUrl={result} />
      )}

      <Footer />
    </main>
  );
}
