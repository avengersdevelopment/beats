"use client";

import { useState, ChangeEvent } from "react";

interface SliderDurationProps {
  duration: number;
  onChange: (duration: number) => void;
}
export default function SliderDuration({
  duration,
  onChange,
}: SliderDurationProps) {
  const steps = [8, 12, 16, 20, 24];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="mt-3 md:mt-[1.25vw] flex w-full flex-col items-center">
      {/* Slider Container */}
      <div className="relative w-full">
        {/* Track Line */}
        <div className="absolute top-1/2 h-[2px] md:h-1 w-full -translate-y-1/2 transform rounded-full bg-gray-300"></div>
        {/* Active Track */}
        <div
          className="absolute top-1/2 h-[2px] md:h-1 -translate-y-1/2 transform rounded-full bg-[#630FFF]"
          style={{
            left: "0",
            width: `${((duration - 8) / (24 - 8)) * 100}%`,
          }}
        ></div>

        {/* Steps (Circles) */}
        <div className="absolute top-1/2 flex w-full -translate-y-1/2 transform justify-between">
          {steps.map((point) => (
            <div
              key={point}
              className={`h-2 w-2 md:h-4 md:w-4 rounded-full ${
                point <= duration ? "bg-[#630FFF]" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* Slider Input */}
        <input
          type="range"
          min="8"
          max="24"
          step="4"
          value={duration}
          onChange={handleChange}
          className="absolute w-full cursor-pointer opacity-0"
        />
      </div>

      {/* Number Labels */}
      <div className="mt-2 md:mt-[0.5vw] flex w-full justify-between">
        {steps.map((point) => (
          <span key={point} className="text-[8px] md:text-[0.75vw] text-white">
            {point}
          </span>
        ))}
      </div>
    </div>
  );
}
