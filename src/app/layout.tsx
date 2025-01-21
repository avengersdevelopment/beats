import Aos from "@/components/aos";
import Providers from "@/components/providers";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local"
import { twMerge } from "tailwind-merge";
import "./globals.css";

// const dmSans = DM_Sans({
//   weight: ["400", "700"],
//   subsets: ["latin"],
//   variable: "--font-dm",
// });

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

const joystix = localFont({
  src: "../../public/fonts/joystix.otf",
  variable: "--font-joystix"
})

export const metadata: Metadata = {
  title: "App Name",
  description: "App Description",
  openGraph: {
    title: "App Name",
    description: "App Description",
    url: "/",
    images: [
      {
        url: "/preview.png",
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
        <body className={twMerge(joystix.variable, poppins.variable, "font-joystix antialiased")}>
          <Providers config={configs?.[0] || null}>{children}</Providers>
        </body>
      </html>
    </>
  );
}
