"use client";

import Header from "@/app/_components/header";
import { Section1 } from "@/app/_components/section-1";
import { Section2 } from "@/app/_components/section-2";
import { Section3 } from "@/app/_components/section-3";
import { Section4 } from "@/app/_components/section-4";
import Footer from "@/app/_components/footer";
import RunningText from "@/app/_components/running-text";
import Image from "next/image";
import { useConfig } from "@/store/config";
import { useState } from "react";

export default function Container() {
  const [result, setResult] = useState(false)
  // const xCoinUrl = useConfig()((state) => state.config.x_coin_url);
  // const buyUrl = useConfig()((state) => state.config.buy_url);

  // console.info(xCoinUrl);
  // console.info(buyUrl);

  return (
    <main className="relative h-screen w-full bg-[url('/assets/homepage/bg.jpeg')] bg-cover bg-bottom bg-no-repeat">
      <div className="h-full w-full bg-[url('/assets/homepage/overlay.png')] bg-bottom bg-cover bg-no-repeat relative">
        {result ? <Section2 onBack={() => setResult(false)} /> : <Section1 onSubmit={() => setResult(true)} />}
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </main>
  );
}
