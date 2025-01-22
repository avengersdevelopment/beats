import { useRef, useState, useEffect } from "react";

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSliderDragStart = () => {
    setIsDragging(true);
  };

  const handleSliderDragEnd = () => {
    setIsDragging(false);
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  };

  return (
    <div className="w-full p-4 bg-[#36088D] text-white rounded-lg flex items-center space-x-4 border-white border-2">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="w-10 h-10 flex items-center justify-center"
      >
        {isPlaying ? (
          <span className="font-bold text-lg">||</span>
        ) : (
          <span className="font-bold text-lg">▶</span>
        )}
      </button>

      <div className="flex items-center space-x-4 flex-1">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          step="0.1"
          onChange={handleSliderChange}
          onMouseDown={handleSliderDragStart}
          onMouseUp={handleSliderDragEnd}
          onTouchStart={handleSliderDragStart}
          onTouchEnd={handleSliderDragEnd}
          className="w-full h-2 bg-purple-900 rounded-full appearance-none focus:outline-none slider-thumb "
          style={{
            background: `linear-gradient(to right, #fff ${(currentTime / duration) * 100}%, #6B21A8 ${(currentTime / duration) * 100}%)`,
          }}
        />
        <span className="text-sm font-poppins w-32">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <audio
        ref={audioRef}
        src="https://replicate.delivery/yhqm/akulcSKrG7pgLFq6pTmnL1fVxdctQPPEap1FXCsx1Bv86xDKA/out.mp3"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
      ></audio>
    </div>
  );
};

export default AudioPlayer;
