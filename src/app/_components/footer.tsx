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
    const { data: library } = await supabase
      .from("library")
      .select()
      .eq("user_id", userId);
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
        <div className="flex h-full w-[90vw] items-center justify-center gap-[2vw] md:w-[80vw]">
          <Link href={buyUrl || ""} target="_blank">
            <Image
              src={"/assets/home/btn-dex.png"}
              width={480}
              height={480}
              alt=""
              className="h-auto w-[15vw] hover:animate-shake md:w-[10vw]"
              priority
            />
          </Link>

          <Link href={xCoinUrl || ""} target="_blank">
            <Image
              src={"/assets/home/btn-x.png"}
              width={480}
              height={480}
              alt=""
              className="h-auto w-[11vw] hover:animate-shake md:w-[7vw]"
              priority
            />
          </Link>

          <Image
            src={"/assets/home/btn-demo.png"}
            width={480}
            height={480}
            alt=""
            className="absolute -top-[10%] h-auto w-[40vw] cursor-pointer hover:animate-shake md:-top-[25%] md:left-[40%] md:w-[24vw]"
            priority
            onClick={() => setIsModalDemoOpen(true)}
          />

          <div className="flex h-auto w-[20vw] flex-col items-center justify-end md:mt-[1vw]">
            <p className="text-[8px] text-white md:text-[1vw]">POWERED BY</p>
            <Image
              src={"/assets/home/deepseek-logo.png"}
              width={480}
              height={480}
              alt=""
              className="h-auto w-[20vw] md:w-[12vw]"
              priority
            />
          </div>

          <Image
            src={"/assets/home/btn-library.png"}
            width={480}
            height={480}
            alt=""
            className="h-auto w-[25vw] cursor-pointer hover:animate-shake md:w-[16vw]"
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
              <div className="h-[30vh] w-[80vw] md:h-[70vh] md:w-[50vw]">
                <motion.div
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  className="relative flex h-full w-full flex-col border-[0.25vw] border-white"
                >
                  <div className="absolute -right-[3vw] -top-[3.5vw] z-50 md:-right-[1.5vw] md:-top-[1.5vw]">
                    <Image
                      src={"/assets/home/btn-close.png"}
                      width={480}
                      height={480}
                      alt=""
                      className="h-auto w-[6vw] cursor-pointer hover:animate-shake md:w-[2.5vw]"
                      onClick={() => setIsModalOpen(false)}
                    />
                  </div>

                  <Image
                    src={"/assets/home/icon-music.png"}
                    width={480}
                    height={480}
                    alt=""
                    className="absolute -left-[4vw] -top-[4vw] h-auto w-[8vw] md:-left-[2.5vw] md:-top-[2.5vw] md:w-[5vw]"
                  />

                  <div className="w-full border-b-[0.25vw] border-white bg-[#630FFF] p-2 md:p-[1vw]">
                    <p className="text-center text-xs text-white md:text-[2vw]">
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
                            <p className="w-[30vw] truncate bg-white text-[8px] text-black md:text-[1.25vw]">
                              {item.prompt}
                            </p>
                            <p className="text-[5px] text-white md:text-[0.75vw]">
                              {`Generated on: ${date.toLocaleString()}`}
                            </p>
                            <p className="text-[5px] text-white md:text-[0.75vw]">
                              Duration: {item.duration}
                            </p>
                          </div>

                          <div className="flex h-min w-[30%] gap-[1vw]">
                            {isPlaying && musicUrl === item.output ? (
                              <Image
                                src={"/assets/home/btn-pause.png"}
                                width={480}
                                height={480}
                                alt=""
                                className="h-auto w-[8vw] cursor-pointer hover:animate-shake md:w-[4vw]"
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
                                className="h-auto w-[8vw] cursor-pointer hover:animate-shake md:w-[4vw]"
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
                              className="h-auto w-[8vw] cursor-pointer hover:animate-shake md:w-[4vw]"
                              onClick={() => handleDownload(item)}
                            />

                            <Image
                              src={"/assets/home/btn-delete.png"}
                              width={480}
                              height={480}
                              alt=""
                              className="h-auto w-[8vw] cursor-pointer hover:animate-shake md:w-[4vw]"
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
            className="absolute left-0 top-0 z-40 h-screen w-full bg-black/50"
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-[30vh] w-[80vw] md:h-[70vh] md:w-[50vw]">
                <motion.div
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  exit={{ y: 100 }}
                  className="relative flex h-full w-full flex-col items-center justify-center rounded-xl border-[0.25vw] border-white p-[1vw] backdrop-blur-lg"
                >
                  <div className="absolute -right-[1.5vw] -top-[1.5vw] z-50">
                    <Image
                      src={"/assets/home/btn-close.png"}
                      width={480}
                      height={480}
                      alt=""
                      className="h-auto w-[6vw] cursor-pointer hover:animate-shake md:w-[2.5vw]"
                      onClick={() => setIsModalDemoOpen(false)}
                    />
                  </div>

                  <div className="mb-[1vw] h-full w-full p-[1vw]">
                    <div className="flex h-full w-full flex-col items-center justify-center bg-black">
                      {/* VIDEO */}
                    </div>
                  </div>

                  <Link href={""}>
                    <Image
                      src={"/assets/home/btn-demo.png"}
                      width={480}
                      height={480}
                      className="mb-[1vw] h-auto w-[30vw] hover:animate-shake md:w-[14vw]"
                      alt=""
                    />
                  </Link>
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
