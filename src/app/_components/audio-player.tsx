"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  musicSrc: string;
}

export function AudioPlayer({ musicSrc }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const audioDuration = audioRef.current.duration;
      if (!isNaN(audioDuration)) {
        setDuration(audioDuration);
      }
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (audioRef) {
      if (isPlaying) {
        audioRef?.current?.play();
      } else {
        audioRef?.current?.pause();
      }
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      audio.addEventListener('timeupdate', updateTime);
      return () => audio.removeEventListener('timeupdate', updateTime);
    }
  }, []);

  useEffect(() => {
    // Reset states when music source changes
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    // Load duration when component mounts or musicSrc changes
    const audio = audioRef.current;
    if (audio) {
      audio.load(); // Force reload the audio
      if (audio.readyState > 0) {
        onLoadedMetadata();
      }
    }
  }, [musicSrc]);

  return (
    <div className="relative flex h-[8vh] w-full items-center gap-4 md:gap-[2vw] rounded-lg border-[0.25vw] bg-[#36088D] px-[2.5vw] mb-[2vw]">
      <Image
        src={"/assets/home/icon-music.png"}
        width={480}
        height={480}
        alt=""
        className="absolute -left-[3.5vw] md:-left-[2.5vw] -top-[3vw] md:-top-[2.5vw] h-auto w-[8vw] md:w-[5vw]"
      />

      {isPlaying ? (
        <Image
          src={"/assets/home/icon-pause.png"}
          width={480}
          height={480}
          alt=""
          className="h-auto w-[3vw] md:w-[1.75vw] cursor-pointer"
          onClick={() => setIsPlaying(false)}
        />
      ) : (
        <Image
          src={"/assets/home/icon-play.png"}
          width={480}
          height={480}
          alt=""
          className="h-auto w-[3vw] md:w-[1.75vw] cursor-pointer"
          onClick={() => setIsPlaying(true)}
        />
      )}

      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        step={0.1}
        onChange={(e) => {
          const newTime = Number(e.target.value);
          setCurrentTime(newTime);
          if (audioRef.current) {
            audioRef.current.currentTime = newTime;
          }
        }}
        className="h-[0.75vw] md:h-[0.25vw] w-full appearance-none rounded-full bg-white/30 [&::-moz-range-thumb]:h-[1.5vw] [&::-moz-range-thumb]:w-[1.5vw] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-[1.5vw] [&::-webkit-slider-thumb]:w-[1.5vw] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        style={{
          background: `linear-gradient(to right, #FFFFFF ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%)`,
        }}
      />

      <p className="text-[8px] md:text-[0.75vw] text-white">{formatTime(currentTime)}/{formatTime(duration)}</p>

      <audio 
        ref={audioRef} 
        onLoadedMetadata={onLoadedMetadata}
        preload="metadata"
        key={musicSrc} // Force audio element recreation when source changes
      >
        <source
          src={musicSrc}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}
