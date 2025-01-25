import Image from "next/image";
import { AudioPlayer } from "./audio-player";

interface ResultPageProps {
  musicUrl: string;
  onBack: () => void;
}

export default function ResultPage({ musicUrl, onBack }: ResultPageProps) {
  return (
    <section className="relative flex h-[80vh] w-full justify-center">
      <div className="flex h-full w-[55vw] flex-col items-center justify-center">
        <p
          className="text-[8vw] text-white drop-shadow-[0_5px_#C2A2FF]"
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
            className="h-auto w-[12vw] cursor-pointer hover:animate-shake"
            onClick={onBack}
          />

          <Image
            src={"/assets/home/btn-download.png"}
            width={480}
            height={480}
            alt=""
            className="h-auto w-[14vw] cursor-pointer hover:animate-shake"
            onClick={() => {}}
          />

          <Image
            src={"/assets/home/btn-share.png"}
            width={480}
            height={480}
            alt=""
            className="h-auto w-[12vw] cursor-pointer hover:animate-shake"
            onClick={() => {}}
          />
        </div>
      </div>
    </section>
  );
}
