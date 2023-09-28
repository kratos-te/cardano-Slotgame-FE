import { FC } from "react";
import { CloseIcon } from "./SvgIcons";

interface GameFeeProps {
    isOpen: boolean;
    onClose: () => void;
}

const GameFee: FC<GameFeeProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center text-white uppercase">
            <div className="fixed inset-0 top-0 left-0 w-screen h-screen backdrop-blur-lg "></div>
            <div className="bg-[#000] rounded-lg shadow-lg relative w-[600px] max-sm:w-[400px] max-[400px]:w-[300px] max-lg:overflow-auto max-[600px]:h-[600px]">
                <button
                    className="absolute mt-3 mr-4 text-gray-700 top-2 right-2 hover:text-gray-900"
                    onClick={onClose}
                >
                    <CloseIcon color="#fff" />
                </button>
                <div className="p-6">
                    <h2 className="text-4xl font-black text-center text-blue-300">
                        GAME FEES
                    </h2>
                    <p className="text-md font-black text-center text-blue-300">PER SPIN FEE FOR EACH TOKEN</p>
                    <div className="mt-2">
                        <table className="w-full">
                            <thead className="text-[#ad14cf]">
                                <tr>
                                    <th className="border-b border-[#fff] py-2 w-1/4">
                                        TOKEN / COIN
                                    </th>
                                    <th className="border-b border-[#fff] py-2 w-1/4">FEE</th>
                                    <th className="border-b border-[#fff] py-2 w-1/3">
                                        MIN. & MAX. BETS
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-lg">
                                <tr className="border-b border-[#ffffff65] py-10">
                                    <td className="text-left pl-10 border-b border-[#ffffff65] py-6">
                                        ADA
                                    </td>
                                    <td className="text-left pl-10 border-b border-[#ffffff65]">
                                        1 ada
                                        <p className="text-[10px]">(INCLUDED IN BET)</p>
                                    </td>
                                    <td className="text-left pl-10 border-b border-[#ffffff65]">3 ada - 50 ada</td>
                                </tr>
                                <tr className="border-b border-[#ffffff65] ">
                                    <td className="text-left pl-10 border-b border-[#ffffff65] py-6">
                                        NEBULA
                                    </td>
                                    <td className="text-left pl-10 border-b border-[#ffffff65]">
                                        1 ada
                                    </td>
                                    <td className="text-left pl-10 border-b border-[#ffffff65]">1 k nebula - <br />100 k nebula</td>
                                </tr>
                                <tr className="border-b border-[#ffffff65] ">
                                    <td className="text-left pl-10 border-b border-[#ffffff65] py-6">
                                        D.U.M
                                    </td>
                                    <td className="text-left pl-10 border-b border-[#ffffff65]">
                                        2 ada
                                    </td>
                                    <td className="text-left pl-10 border-b border-[#ffffff65]">100 d.u.m - <br />25k d.u.m</td>
                                </tr>
                                <tr className="border-b border-[#ffffff65] ">
                                    <td className="text-left pl-10 border-b border-[#ffffff65] py-6">
                                        KONDA
                                    </td>
                                    <td className="text-left pl-10 border-b border-[#ffffff65]">
                                        2 ada
                                    </td>
                                    <td className="text-left pl-10 border-b border-[#ffffff65]">10 k konda - <br />500 k konda</td>
                                </tr>
                                <tr className=" ">
                                    <td className="text-left pl-10  py-6">
                                        SNEK
                                    </td>
                                    <td className="text-left pl-10 ">
                                        1000 Snek
                                    </td>
                                    <td className="text-left pl-10 ">5 k snek - <br />1M snek</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="w-full text-left pl-4 text-[10px]">
              * ALL SPIN FEES WILL BE DEDUCTED FROM YOUR BALANCE AT THE BEGINING OF EACH SPIN
            </p>
            <p className="w-full text-left  pl-4 text-[10px]">
              * ALL ADA BETS ARE INCLUSIVE OF FEES. A WIN WILL RESULT IN NO FEES BEING TAKEN
            </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameFee