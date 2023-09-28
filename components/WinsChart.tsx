import React, { ReactNode } from "react";
import { CloseIcon } from "./SvgIcons";
import Alien from "../assets/images/symbols/alien.png";
import Commet from "../assets/images/symbols/commet.png";
import Jetpack from "../assets/images/symbols/jetpack.png";
import Netbula from "../assets/images/symbols/netbula.png";
import Rocket from "../assets/images/symbols/rocket.png";
import Saturn from "../assets/images/symbols/saturn.png";
import Bug from "../assets/images/snek_symbols/bug.png";
import Can from "../assets/images/snek_symbols/can.png";
import Gentle from "../assets/images/snek_symbols/gentle.png";
import Muscle from "../assets/images/snek_symbols/muscle.png";
import Text from "../assets/images/snek_symbols/text.png";
import Twice from "../assets/images/snek_symbols/twice.png";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  token: string;
}

const WinsChart: React.FC<ModalProps> = ({ isOpen, onClose, token }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center text-white ">
      <div className="fixed inset-0 top-0 left-0 w-screen h-screen backdrop-blur-lg "></div>
      <div className="bg-[#000] rounded-lg shadow-lg w-[600px] relative max-sm:w-[400px] max-[400px]:w-[300px] max-lg:h-screen max-lg:overflow-auto max-[600px]:h-[600px]">
        <button
          className="absolute mt-3 mr-4 text-gray-700 top-2 right-2 hover:text-gray-900"
          onClick={onClose}
        >
          <CloseIcon color="#fff" />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-black text-center text-blue-300">
            SPACE RACE PAY TABLE
          </h2>
          <p className="text-[10px] font-black text-center text-blue-300 uppercase">only one win per spin.<br /> in the case of multiple wins only the highest value symbol will be paid out</p>
          <div className="mt-2">
            <table className="w-full">
              <thead className="text-[#ad14cf]">
                <tr>
                  <th colSpan={1} className="border-b border-[#fff] py-2 w-1/2">
                    3 or more Symbols in a Row
                  </th>
                  <th className="border-b border-[#fff] py-2 w-1/4">Payout</th>
                  {/* <th className="border-b border-[#fff] py-2 w-1/4">
                    Probability
                  </th> */}
                </tr>
              </thead>
              {token ==="snek" ? <tbody>
                <tr className="border-b border-[#ffffff65] ">
                  <div className="flex-col -space-y-2">
                    <div className="flex space-x-4">
                      <Image src={Bug} className="w-20 h-20" alt="" />
                      <Image src={Bug} className="w-20 h-20" alt="" />
                      <Image src={Bug} className="w-20 h-20" alt="" />
                      <Image src={Bug} className="w-20 h-20" alt="" />
                      <Image src={Bug} className="w-20 h-20" alt="" />
                    </div>
                    <p className="text-center pl-10">OR</p>
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Bug} className="w-20 h-20" alt="" />
                        <Image src={Bug} className="w-20 h-20" alt="" />
                        <Image src={Bug} className="w-20 h-20" alt="" />
                        <Image src={Bug} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Bug} className="w-20 h-20" alt="" />
                        <Image src={Bug} className="w-20 h-20" alt="" />
                        <Image src={Bug} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    1.5x
                  </td>
                </tr>
                <tr className="border-b border-[#ffffff65]">
                  <div className="flex-col -space-y-0 py-2">
                    <div className="flex space-x-4">
                      <Image src={Text} className="w-20 h-20" alt="" />
                      <Image src={Text} className="w-20 h-20" alt="" />
                      <Image src={Text} className="w-20 h-20" alt="" />
                      <Image src={Text} className="w-20 h-20" alt="" />
                      <Image src={Text} className="w-20 h-20" alt="" />
                    </div>
                    <p className="text-center pl-10">OR</p>
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Text} className="w-20 h-20" alt="" />
                        <Image src={Text} className="w-20 h-20" alt="" />
                        <Image src={Text} className="w-20 h-20" alt="" />
                        <Image src={Text} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Text} className="w-20 h-20" alt="" />
                        <Image src={Text} className="w-20 h-20" alt="" />
                        <Image src={Text} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    2x
                  </td>
                </tr>
                <tr className="border-b border-[#ffffff65]">
                  <div className="flex-col -space-y-2 pb-2">
                    <div className="flex space-x-4">
                      <Image src={Gentle} className="w-20 h-20" alt="" />
                      <Image src={Gentle} className="w-20 h-20" alt="" />
                      <Image src={Gentle} className="w-20 h-20" alt="" />
                      <Image src={Gentle} className="w-20 h-20" alt="" />
                      <Image src={Gentle} className="w-20 h-20" alt="" />
                    </div>
                    <p className="text-center pl-10">OR</p>
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Gentle} className="w-20 h-20" alt="" />
                        <Image src={Gentle} className="w-20 h-20" alt="" />
                        <Image src={Gentle} className="w-20 h-20" alt="" />
                        <Image src={Gentle} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Gentle} className="w-20 h-20" alt="" />
                        <Image src={Gentle} className="w-20 h-20" alt="" />
                        <Image src={Gentle} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    3x
                  </td>
                </tr>
                <tr className="border-b border-[#ffffff65]">
                  <div className="flex-col -space-y-2 pb-2">
                    <div className="flex space-x-4">
                      <Image src={Twice} className="w-20 h-20" alt="" />
                      <Image src={Twice} className="w-20 h-20" alt="" />
                      <Image src={Twice} className="w-20 h-20" alt="" />
                      <Image src={Twice} className="w-20 h-20" alt="" />
                      <Image src={Twice} className="w-20 h-20" alt="" />
                    </div>
                    <p className="text-center pl-10">OR</p>
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Twice} className="w-20 h-20" alt="" />
                        <Image src={Twice} className="w-20 h-20" alt="" />
                        <Image src={Twice} className="w-20 h-20" alt="" />
                        <Image src={Twice} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Twice} className="w-20 h-20" alt="" />
                        <Image src={Twice} className="w-20 h-20" alt="" />
                        <Image src={Twice} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    3.6x
                  </td>
                </tr>
                <tr className="border-b border-[#ffffff65]">
                  <div className="flex-col -space-y-2 pb-2">
                    <div className="flex space-x-6">
                      <Image src={Can} className="w-20 h-20" alt="" />
                      <Image src={Can} className="w-20 h-20" alt="" />
                      <Image src={Can} className="w-20 h-20" alt="" />
                      <Image src={Can} className="w-20 h-20" alt="" />
                      <Image src={Can} className="w-20 h-20" alt="" />
                    </div>
                    <p className="text-center pl-10">OR</p>
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Can} className="w-20 h-20" alt="" />
                        <Image src={Can} className="w-20 h-20" alt="" />
                        <Image src={Can} className="w-20 h-20" alt="" />
                        <Image src={Can} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Can} className="w-20 h-20" alt="" />
                        <Image src={Can} className="w-20 h-20" alt="" />
                        <Image src={Can} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    5x
                  </td>
                </tr>
                <tr className="border-b border-[#ffffff65]">
                  <div className="flex-col -space-y-2 pb-2">
                    <div className="flex space-x-4">
                      <Image src={Muscle} className="w-20 h-20" alt="" />
                      <Image src={Muscle} className="w-20 h-20" alt="" />
                      <Image src={Muscle} className="w-20 h-20" alt="" />
                      <Image src={Muscle} className="w-20 h-20" alt="" />
                      <Image src={Muscle} className="w-20 h-20" alt="" />
                    </div>
                    <p className="text-center pl-10">OR</p>
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Muscle} className="w-20 h-20" alt="" />
                        <Image src={Muscle} className="w-20 h-20" alt="" />
                        <Image src={Muscle} className="w-20 h-20" alt="" />
                        <Image src={Muscle} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Muscle} className="w-20 h-20" alt="" />
                        <Image src={Muscle} className="w-20 h-20" alt="" />
                        <Image src={Muscle} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    10x
                  </td>
                </tr>
              </tbody>
              :
              <tbody>
                <tr className="border-b border-[#ffffff65] ">
                  <div className="flex-col -space-y-4">
                    <div className="flex space-x-4">
                      <Image src={Saturn} className="w-20 h-20" alt="" />
                      <Image src={Saturn} className="w-20 h-20" alt="" />
                      <Image src={Saturn} className="w-20 h-20" alt="" />
                      <Image src={Saturn} className="w-20 h-20" alt="" />
                      <Image src={Saturn} className="w-20 h-20" alt="" />
                    </div>
                    
                      <p className="text-center pl-10">OR</p>
                    
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Saturn} className="w-20 h-20" alt="" />
                        <Image src={Saturn} className="w-20 h-20" alt="" />
                        <Image src={Saturn} className="w-20 h-20" alt="" />
                        <Image src={Saturn} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Saturn} className="w-20 h-20" alt="" />
                        <Image src={Saturn} className="w-20 h-20" alt="" />
                        <Image src={Saturn} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    1.5x
                  </td>
                </tr>
                <tr className="border-b border-[#ffffff65]">
                  <div className="flex-col -space-y-2 pb-2">
                    <div className="flex space-x-4">
                      <Image src={Rocket} className="w-20 h-20" alt="" />
                      <Image src={Rocket} className="w-20 h-20" alt="" />
                      <Image src={Rocket} className="w-20 h-20" alt="" />
                      <Image src={Rocket} className="w-20 h-20" alt="" />
                      <Image src={Rocket} className="w-20 h-20" alt="" />
                    </div>
                    <p className="text-center pl-10">OR</p>
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Rocket} className="w-20 h-20" alt="" />
                        <Image src={Rocket} className="w-20 h-20" alt="" />
                        <Image src={Rocket} className="w-20 h-20" alt="" />
                        <Image src={Rocket} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Rocket} className="w-20 h-20" alt="" />
                        <Image src={Rocket} className="w-20 h-20" alt="" />
                        <Image src={Rocket} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    2x
                  </td>
                </tr>
                <tr className="border-b border-[#ffffff65]">
                  <div className="flex-col -space-y-4 pb-2">
                    <div className="flex space-x-4">
                      <Image src={Netbula} className="w-20 h-20" alt="" />
                      <Image src={Netbula} className="w-20 h-20" alt="" />
                      <Image src={Netbula} className="w-20 h-20" alt="" />
                      <Image src={Netbula} className="w-20 h-20" alt="" />
                      <Image src={Netbula} className="w-20 h-20" alt="" />
                    </div>
                    <p className="text-center pl-10">OR</p>
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Netbula} className="w-20 h-20" alt="" />
                        <Image src={Netbula} className="w-20 h-20" alt="" />
                        <Image src={Netbula} className="w-20 h-20" alt="" />
                        <Image src={Netbula} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Netbula} className="w-20 h-20" alt="" />
                        <Image src={Netbula} className="w-20 h-20" alt="" />
                        <Image src={Netbula} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    3x
                  </td>
                </tr>
                <tr className="border-b border-[#ffffff65]">
                  <div className="flex-col -space-y-2 pb-2">
                    <div className="flex space-x-4">
                      <Image src={Jetpack} className="w-20 h-20" alt="" />
                      <Image src={Jetpack} className="w-20 h-20" alt="" />
                      <Image src={Jetpack} className="w-20 h-20" alt="" />
                      <Image src={Jetpack} className="w-20 h-20" alt="" />
                      <Image src={Jetpack} className="w-20 h-20" alt="" />
                    </div>
                    <p className="text-center pl-10">OR</p>
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Jetpack} className="w-20 h-20" alt="" />
                        <Image src={Jetpack} className="w-20 h-20" alt="" />
                        <Image src={Jetpack} className="w-20 h-20" alt="" />
                        <Image src={Jetpack} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Jetpack} className="w-20 h-20" alt="" />
                        <Image src={Jetpack} className="w-20 h-20" alt="" />
                        <Image src={Jetpack} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    3.6x
                  </td>
                </tr>
                <tr className="border-b border-[#ffffff65]">
                  <div className="flex-col -space-y-2 py-2">
                    <div className="flex space-x-6">
                      <Image src={Commet} className="w-20 h-20" alt="" />
                      <Image src={Commet} className="w-20 h-20" alt="" />
                      <Image src={Commet} className="w-20 h-20" alt="" />
                      <Image src={Commet} className="w-20 h-20" alt="" />
                      <Image src={Commet} className="w-20 h-20" alt="" />
                    </div>
                    <p className="text-center pl-10">OR</p>
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Commet} className="w-20 h-20" alt="" />
                        <Image src={Commet} className="w-20 h-20" alt="" />
                        <Image src={Commet} className="w-20 h-20" alt="" />
                        <Image src={Commet} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Commet} className="w-20 h-20" alt="" />
                        <Image src={Commet} className="w-20 h-20" alt="" />
                        <Image src={Commet} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    5x
                  </td>
                </tr>
                <tr className="border-b border-[#ffffff65]">
                  <div className="flex-col -space-y-2 py-2">
                    <div className="flex space-x-4">
                      <Image src={Alien} className="w-20 h-20" alt="" />
                      <Image src={Alien} className="w-20 h-20" alt="" />
                      <Image src={Alien} className="w-20 h-20" alt="" />
                      <Image src={Alien} className="w-20 h-20" alt="" />
                      <Image src={Alien} className="w-20 h-20" alt="" />
                    </div>
                    <p className="text-center pl-10">OR</p>
                    <div className="flex space-x-10 w-3/4 mx-auto">
                      <div className="flex space-x-2">
                        <Image src={Alien} className="w-20 h-20" alt="" />
                        <Image src={Alien} className="w-20 h-20" alt="" />
                        <Image src={Alien} className="w-20 h-20" alt="" />
                        <Image src={Alien} className="w-20 h-20" alt="" />
                      </div>
                      <div className="flex space-x-2">
                        <Image src={Alien} className="w-20 h-20" alt="" />
                        <Image src={Alien} className="w-20 h-20" alt="" />
                        <Image src={Alien} className="w-20 h-20" alt="" />
                      </div>
                    </div>
                  </div>
                  <td className="text-center border-b border-[#ffffff65]">
                    10x
                  </td>
                </tr>
              </tbody>}
            </table>
            <p className="w-full text-center">
              * Matching symbols must be next to each other
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinsChart;