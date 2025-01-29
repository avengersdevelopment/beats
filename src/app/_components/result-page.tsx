import Image from "next/image";
import { AudioPlayer } from "./audio-player";
import { TwitterShareButton } from "react-share";

interface ResultPageProps {
  musicUrl: string;
  onBack: () => void;
}

export default function ResultPage({ musicUrl, onBack }: ResultPageProps) {
  async function handleDownload() {
    try {
      const response = await fetch(musicUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `BEATS.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  return (
    <section className="relative flex h-[80vh] w-full justify-center">
      <div className="flex h-full w-[80vw] flex-col items-center justify-center md:w-[55vw]">
        <p
          className="mb-4 text-6xl text-white drop-shadow-[0_5px_#C2A2FF] md:mb-8 md:text-[8vw]"
          style={{ WebkitTextStroke: "0.05vw", WebkitTextStrokeColor: "black" }}
        >
          RESULT!
        </p>
        <AudioPlayer musicSrc={musicUrl} />

        <div className="flex w-full justify-center gap-[2vw]">
          <Image
            src={"/assets/home/btn-back.png"}
            width={480}
            height={480}
            alt=""
            className="h-auto w-[20vw] md:w-[12vw] cursor-pointer hover:animate-shake"
            onClick={onBack}
          />

          <Image
            src={"/assets/home/btn-download.png"}
            width={480}
            height={480}
            alt=""
            className="h-auto w-[22vw] md:w-[14vw] cursor-pointer hover:animate-shake"
            onClick={() => handleDownload()}
          />

          <TwitterShareButton url={"x.com"} title={"example title"}>
            <Image
              src={"/assets/home/btn-share.png"}
              width={480}
              height={480}
              alt=""
              className="h-auto w-[18vw] md:w-[12vw] cursor-pointer hover:animate-shake"
            />
          </TwitterShareButton>
        </div>
      </div>
    </section>
  );
}
