import Image from "next/image";
import React, { useState } from "react";

interface IDraggableModal {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}

const DraggableModal = ({ isOpen, onClose, children }: IDraggableModal) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => setDragging(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 modal-music-library"
      onMouseUp={handleMouseUp}
    >
      <div
        className="relative w-[45rem] bg-black bg-opacity-30 backdrop-blur-md border-4 border-white shadow-lg"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div className="flex justify-center items-center text-white font-bold bg-[#630FFF] w-full h-14 p-4 border-b-4 border-white">
          <h2 className="text-lg pointer-events-none">Your Generated Music History</h2>
        </div>
        <div className="mt-4 text-sm text-white h-[50vh] overflow-y-auto p-4">{children}</div>
        <Image width={200} height={200} src="/assets/homepage/music-icon.png" alt="music" className="w-[4.5rem] absolute -top-8 -left-10"/>
        <button
            className="absolute -top-5 -right-5 rounded-full w-12 h-12 bg-[#EC2735] text-lg border-4 border-white text-white"
            onClick={onClose}
          >
            x
          </button>
      </div>
    </div>
  );
};

export default DraggableModal;
