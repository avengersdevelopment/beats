import Image from "next/image";
import AudioPlayer from "./ui/audio-player";

export const Section2 = ({onBack}: {onBack: () => void}) => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center">
      <div className="text-center text-white -mt-16 mb-5">
        <h1 className="drop-shadow-purple text-8xl outline-text mb-10">Result!</h1>
      </div>
      <div className="w-[30vw] h-[10vh] relative flex">
        <Image width={200} height={200} src="/assets/homepage/music-icon.png" alt="music" className="w-[4.5rem] absolute -top-8 -left-10" />
        <AudioPlayer />
      </div>
      <div className="flex gap-4 mt-8">
        <button onClick={onBack}>
          <Image width={200} height={200} src="/assets/homepage/back.png" alt="music" className="w-[18vh]" />
        </button>
        <button>
          <Image width={200} height={200} src="/assets/homepage/download.png" alt="music" className="w-[25vh]" />
        </button>
        <button>
          <Image width={200} height={200} src="/assets/homepage/share.png" alt="music" className="w-[18vh]" />
        </button>
      </div>
    </section>
  );
};
