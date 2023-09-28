/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect } from "react";
import { CloseIcon } from "./SvgIcons";
import { SymbolItem } from "./Symbols";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Howl } from "howler";
import { getAmount } from "../utils/api";

interface ModalProps {
  isOpen: boolean;
  multiplier: number;
  getAmount: number;
  onClose: () => void;
  onReset: () => void;
  children?: ReactNode;
  token: string;
}

const WinPopup: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  multiplier,
  getAmount,
  onReset,
  token
}) => {
  const { width, height } = useWindowSize();
  const winSound = new Howl({
    src: "../sounds/play-1.wav"
  });

  const clapSound = new Howl({
    src: "../sounds/clap.wav"
  });

  useEffect(() => {
    if (isOpen) {
      winSound.play();
      clapSound.play();
    } else {
      winSound.stop();
      clapSound.stop();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center text-white">
      {isOpen && <Confetti width={width} height={height} />}
      <div className="fixed inset-0 top-0 left-0 w-screen h-screen backdrop-blur-lg "></div>
      <div className="w-[640px] h-[400px] relative max-md:w-[550px] max-sm:w-[450px] max-[500px]:w-[380px] max-[400px]:w-[300px]">
        <img
          src={"./images/cong-bg.png"}
          className="absolute w-full h-full hue-rotate-1"
          alt=""
        />
        <button
          className="absolute z-30 mt-3 mr-4 text-gray-700 top-2 right-2 hover:text-gray-900"
          onClick={() => {
            // onReset();
            winSound.stop();
            clapSound.stop();
            onClose();
          }}
        >
          <CloseIcon color="#fff" />
        </button>
        <div className="relative z-20 flex flex-col items-center justify-center h-full p-10">
          <div className="flex-col items-center gap-6 mt-6">
            <div className="text-yellow-200 font-bold text-[70px] leading-[70px] text-center max-sm:text-[36px]">
              {multiplier} X
            </div>
            <div className="text-yellow-200 font-bold text-[70px] leading-[70px] text-center max-sm:text-[36px] uppercase">
              {getAmount} {token}
            </div>
          </div>
          <div className="mt-5 text-center">
            <button
              className="px-4 uppercase bg-yellow-300 w-[200px] h-10 rounded- text-black font-black text-lg"
              onClick={() => {
                // onReset();
                winSound.stop();
                clapSound.stop();
                onClose();
              }}
            >
              continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinPopup;
