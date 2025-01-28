"use client";

import { useConfig } from "@/store/config";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import modalDummyJson from "@/utils/modal-dummy.json";

export const Footer = () => {
  const xCoinUrl = useConfig()((state) => state.config.x_coin_url);
  const buyUrl = useConfig()((state) => state.config.buy_url);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 flex h-[20vh] w-full justify-center bg-[url('/assets/home/footer.png')] bg-cover bg-top">
        <div className="flex h-full w-[80vw] items-center justify-center gap-[2vw]">
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
            src={"/assets/home/btn-library.png"}
            width={480}
            height={480}
            alt=""
            className="h-auto w-[16vw] cursor-pointer hover:animate-shake"
            priority
            onClick={() => setIsModalOpen(true)}
          />

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
                    {modalDummyJson.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full gap-[2vw] border-b border-dashed p-[2vw]"
                        >
                          <div className="flex flex-col">
                            <p className="w-[30vw] truncate bg-white text-[1.25vw] text-black">
                              {item.title}
                            </p>
                            <p className="text-[0.75vw] text-white">
                              Generated on: {item.generated_on}
                            </p>
                            <p className="text-[0.75vw] text-white">
                              Duration: {item.generated_on}
                            </p>
                          </div>

                          <div className="flex gap-[1vw] h-min">
                            <Image
                              src={"/assets/home/btn-play.png"}
                              width={480}
                              height={480}
                              alt=""
                              className="h-auto w-[4vw] cursor-pointer hover:animate-shake"
                            />

                            <Image
                              src={"/assets/home/btn-download-small.png"}
                              width={480}
                              height={480}
                              alt=""
                              className="h-auto w-[4vw] cursor-pointer hover:animate-shake"
                            />

                            <Image
                              src={"/assets/home/btn-delete.png"}
                              width={480}
                              height={480}
                              alt=""
                              className="h-auto w-[4vw] cursor-pointer hover:animate-shake"
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
    </>
  );
};

export default Footer;
