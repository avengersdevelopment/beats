import Aos from "@/components/aos";
import Providers from "@/components/providers";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import "./globals.css";

const joystix = localFont({
  src: "../../public/fonts/joystix.otf",
  variable: "--font-joystix",
});

export const metadata: Metadata = {
  title: "Beats",
  description: "Generating personalized beats widely.",
  openGraph: {
    title: "Beats",
    description: "Generating personalized beats widely.",
    url: "/",
    images: [
      {
        url: "/banner.png",
        alt: "App Preview",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: configs } = await supabase.from("configs").select();

  return (
    <>
      <Aos />
      <html lang="en" className="relative">
        <body
          className={twMerge(
            joystix.variable,
            "bg-[#36088D] font-joystix antialiased",
          )}
        >
          <Providers config={configs?.[0] || null}>{children}</Providers>
        </body>
      </html>
    </>
  );
}
