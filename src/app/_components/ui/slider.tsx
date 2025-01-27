import { useState, ChangeEvent } from "react";

export default function Slider() {
  const [value, setValue] = useState<number>(12);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const steps = [4, 8, 12, 16, 20];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Slider Container */}
      <div className="relative w-full">
        {/* Track Line */}
        <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded-full transform -translate-y-1/2"></div>
        {/* Active Track */}
        <div
          className="absolute top-1/2 h-1 bg-[#630FFF] rounded-full transform -translate-y-1/2"
          style={{ width: `${((value - 4) / (20 - 4)) * 100}%` }}
        ></div>

        {/* Steps (Circles) */}
        <div className="absolute top-1/2 w-full flex justify-between transform -translate-y-1/2">
          {steps.map((point) => (
            <div
              key={point}
              className={`w-4 h-4 rounded-full ${
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
          className="absolute w-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Number Labels */}
      <div className="flex justify-between w-full mt-2">
        {steps.map((point) => (
          <span
            key={point}
            className="text-sm text-white"
          >
            {point}
          </span>
        ))}
      </div>
    </div>
  );
}
