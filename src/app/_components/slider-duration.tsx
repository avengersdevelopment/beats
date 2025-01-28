import { useState, ChangeEvent } from "react";

export default function SliderDuration() {
  const [value, setValue] = useState<number>(12);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const steps = [8, 12, 16, 20];

  return (
    <div className="flex w-full flex-col items-center">
      {/* Slider Container */}
      <div className="relative w-full">
        {/* Track Line */}
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 transform rounded-full bg-gray-300"></div>
        {/* Active Track */}
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 transform rounded-full bg-[#630FFF]"
          style={{ width: `${((value - 4) / (20 - 4)) * 100}%` }}
        ></div>

        {/* Steps (Circles) */}
        <div className="absolute top-1/2 flex w-full -translate-y-1/2 transform justify-between">
          {steps.map((point) => (
            <div
              key={point}
              className={`h-4 w-4 rounded-full ${
                value >= point ? "bg-[#630FFF]" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* Slider Input */}
        <input
          type="range"
          min="4"
          max="20"
          step="4"
          value={value}
          onChange={handleChange}
          className="absolute w-full cursor-pointer opacity-0"
        />
      </div>

      {/* Number Labels */}
      <div className="mt-2 flex w-full justify-between">
        {steps.map((point) => (
          <span key={point} className="text-sm text-white">
            {point}
          </span>
        ))}
      </div>
    </div>
  );
}
