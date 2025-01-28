"use client";

import { useConfig } from "@/store/config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { MusicResponse } from "../api/generate/route";
import { useUserStore } from "@/store/user-store";

export const Footer = () => {
  const supabase = createClient();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { userId } = useUserStore();

  const xCoinUrl = useConfig()((state) => state.config.x_coin_url);
  const buyUrl = useConfig()((state) => state.config.buy_url);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalDemoOpen, setIsModalDemoOpen] = useState<boolean>(false);
  const [listMusic, setLisMusic] = useState<MusicResponse[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [musicUrl, setMusicUrl] = useState<string>("");

  useEffect(() => {
    if (audioRef) {
      if (isPlaying) {
        audioRef?.current?.play();
      } else {
        audioRef?.current?.pause();
      }
    }
  }, [isPlaying, audioRef]);

  async function fetchMusics() {
    const { data: library } = await supabase.from("library").select();
    if (library) {
      const mappedLibrary: MusicResponse[] = library.map((item) => ({
        item_id: item.item_id,
        user_id: item.user_id,
        created_at: item.created_at,
        prompt: item.prompt,
        output: item.output,
        duration: item.duration,
      }));
      setLisMusic(mappedLibrary);
    }
  }

  async function handleDelete(id: string) {
    try {
      await supabase.from("library").delete().eq("item_id", id);
      await fetchMusics();
    } catch (error) {
      console.error("Error deleting music:", error);
    }
  }

  async function handleDownload(item: MusicResponse) {
    try {
      const response = await fetch(item.output);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${item.prompt}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  useEffect(() => {
    if (isModalOpen && userId) {
      fetchMusics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, userId]);

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
        key={musicUrl} // Force audio element recreation when source changes
      >
        <source src={musicUrl} type="audio/mpeg" />
      </audio>
      <div className="absolute bottom-0 left-0 right-0 flex h-[20vh] w-full justify-center bg-[url('/assets/home/footer.png')] bg-cover bg-top">
        <div className="flex h-full w-[80vw] items-center justify-center gap-[2vw]">
          <Link href={buyUrl || ""} target="_blank">
            <Image
              src={"/assets/home/btn-dex.png"}
              width={480}
              height={480}
              alt=""
              className="h-auto w-[10vw] hover:animate-shake"
              priority
            />
          </Link>

          <Link href={xCoinUrl || ""} target="_blank">
            <Image
              src={"/assets/home/btn-x.png"}
              width={480}
              height={480}
              alt=""
              className="h-auto w-[7vw] hover:animate-shake"
              priority
            />
          </Link>

          <Image
            src={"/assets/home/btn-demo.png"}
            width={480}
            height={480}
            alt=""
            className="absolute -top-[25%] left-[40%] h-auto w-[24vw] cursor-pointer hover:animate-shake"
            priority
            onClick={() => setIsModalDemoOpen(true)}
          />

          <div className="h-auto w-[20vw]" />

          <Image
            src={"/assets/home/btn-library.png"}
            width={480}
            height={480}
            alt=""
            className="h-auto w-[16vw] cursor-pointer hover:animate-shake"
            priority
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 z-50 h-screen w-full bg-black/50"
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-[70vh] w-[50vw]">
                <motion.div
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  className="relative flex h-full w-full flex-col border-[0.25vw] border-white"
                >
                  <div className="absolute -right-[1.5vw] -top-[1.5vw] z-50">
                    <Image
                      src={"/assets/home/btn-close.png"}
                      width={480}
                      height={480}
                      alt=""
                      className="h-auto w-[2.5vw] cursor-pointer hover:animate-shake"
                      onClick={() => setIsModalOpen(false)}
                    />
                  </div>

                  <Image
                    src={"/assets/home/icon-music.png"}
                    width={480}
                    height={480}
                    alt=""
                    className="absolute -left-[2.5vw] -top-[2.5vw] h-auto w-[5vw]"
                  />

                  <div className="w-full border-b-[0.25vw] border-white bg-[#630FFF]">
                    <p className="text-center text-[2vw] text-white">
                      YOUR GENERATED MUSIC HISTORY
                    </p>
                  </div>

                  <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden backdrop-blur-xl">
                    {listMusic.map((item, index) => {
                      const date = new Date(item.created_at);
                      return (
                        <div
                          key={index}
                          className="flex w-full gap-[2vw] border-b border-dashed p-[2vw]"
                        >
                          <div className="flex flex-col">
                            <p className="w-[30vw] truncate bg-white text-[1.25vw] text-black">
                              {item.prompt}
                            </p>
                            <p className="text-[0.75vw] text-white">
                              {`Generated on: ${date.toLocaleString()}`}
                            </p>
                            <p className="text-[0.75vw] text-white">
                              Duration: {item.duration}
                            </p>
                          </div>

                          <div className="flex h-min gap-[1vw]">
                            {isPlaying && musicUrl === item.output ? (
                              <Image
                                src={"/assets/home/btn-pause.png"}
                                width={480}
                                height={480}
                                alt=""
                                className="h-auto w-[4vw] cursor-pointer hover:animate-shake"
                                onClick={() => {
                                  setIsPlaying(false);
                                  setMusicUrl("");
                                }}
                              />
                            ) : (
                              <Image
                                src={"/assets/home/btn-play.png"}
                                width={480}
                                height={480}
                                alt=""
                                className="h-auto w-[4vw] cursor-pointer hover:animate-shake"
                                onClick={() => {
                                  setIsPlaying(true);
                                  setMusicUrl(item.output);
                                }}
                              />
                            )}

                            <Image
                              src={"/assets/home/btn-download-small.png"}
                              width={480}
                              height={480}
                              alt=""
                              className="h-auto w-[4vw] cursor-pointer hover:animate-shake"
                              onClick={() => handleDownload(item)}
                            />

                            <Image
                              src={"/assets/home/btn-delete.png"}
                              width={480}
                              height={480}
                              alt=""
                              className="h-auto w-[4vw] cursor-pointer hover:animate-shake"
                              onClick={() => handleDelete(item.item_id)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalDemoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 z-50 h-screen w-full bg-black/50"
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-[70vh] w-[50vw]">
                <motion.div
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  className="relative flex h-full w-full flex-col rounded-xl border-[0.25vw] border-white backdrop-blur-lg"
                >
                  <div className="absolute -right-[1.5vw] -top-[1.5vw] z-50">
                    <Image
                      src={"/assets/home/btn-close.png"}
                      width={480}
                      height={480}
                      alt=""
                      className="h-auto w-[2.5vw] cursor-pointer hover:animate-shake"
                      onClick={() => setIsModalDemoOpen(false)}
                    />
                  </div>

                  <div className="h-full w-full p-[1vw]">
                    <div className="flex h-full w-full flex-col items-center justify-center bg-black"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
