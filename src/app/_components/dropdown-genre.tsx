import Image from "next/image";
import { useState } from "react";

const genres = ["Lo-fi", "Synthwave", "Jazz", "Hip-Hop", "Classical"];
interface DropdownGenreProps {
  genre: string;
  onChange: (genre: string) => void;
}
export default function DropdownGenre({ genre, onChange }: DropdownGenreProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <div className="flex h-full w-1/2 flex-col gap-[1vw]">
      <div
        className="flex w-full cursor-pointer items-center justify-between gap-[1vw] border bg-[#D9D9D9]/15 p-[0.5vw]"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <p className="text-[8px] md:text-[1vw] text-white">{genre || "GENRE"}</p>
        <Image
          src={"/assets/home/icon-dropdown.png"}
          width={480}
          height={480}
          alt=""
          className="h-2 w-2 md:h-[1.5vh] md:w-[1.5vw]"
        />
      </div>

      {isDropdownOpen && (
        <div className="z-50 flex h-min max-h-[15vh] md:h-[20vh] flex-col items-center gap-[1vw] overflow-y-auto border bg-[#D9D9D9]/15">
          {genres.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full cursor-pointer border-b border-dashed p-[0.5vw]"
                onClick={() => {
                  onChange(item);
                  setIsDropdownOpen((prev) => !prev);
                }}
              >
                <p
                  className="text-[8px] md:text-[1vw] text-white"
                  style={{
                    WebkitTextStroke: "0.05vw",
                    WebkitTextStrokeColor: "black",
                  }}
                >
                  {item}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
