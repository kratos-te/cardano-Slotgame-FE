import React, { ReactNode, useState } from "react";
import { CloseIcon } from "./SvgIcons";
import { RankingDataType } from "../utils/types";

interface LeaderBoardProps {
    isOpen?: boolean;
    rankingData: RankingDataType[];
    onClose: () => void;
    className?: string;
}

export const LeaderBoard: React.FC<LeaderBoardProps> = ({ isOpen, rankingData, className, onClose }) => {

    const [tab, setTab] = useState("Current Week")
    const [showTable, setShowTable] = useState("Current Week")
    const [showWeek, setShowweek] = useState(true)
    const [showMonth, setShowMonth] = useState(false)
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center text-white ">
            <div className="fixed inset-0 top-0 left-0 w-screen h-screen backdrop-blur-lg "></div>
            <div className=" rounded-lg border-2 border-[#ff8300] bg-[#ff8300]/50 shadow-lg h-[90%] w-[600px] relative max-sm:w-[400px] max-[400px]:w-[300px] max-lg:h-screen max-lg:overflow-auto max-[600px]:h-[600px]">
                <button
                    className="absolute mt-3 mr-4 text-gray-700 top-2 right-2 hover:text-gray-900"
                    onClick={onClose}
                >
                    <CloseIcon color="#fff" />
                </button>
                <div className="p-6 flex-col space-y-6">
                    <h2 className="text-2xl font-black text-center text-blue-300">
                       SPACE RACE LEADERBOARDS
                    </h2>
                    <div className="flex justify-center space-x-6">
                        <button className={`rounded-lg px-6 py-2 border-2 border-white text-sm font-semibold ${tab === "Current Week" ? "bg-[#732e9f] text-[#fff]"
                            : "bg-[#471368] text-[#000]"}`} onClick={() => setTab("Current Week")}>Current Week</button>
                        <button className={`rounded-lg px-6 py-2 border-2 border-white text-sm font-semibold ${tab === "Current Month" ? "bg-[#732e9f] text-[#fff]"
                            : "bg-[#471368] text-[#000]"}`} onClick={() => setTab("Current Month")}>Current Month</button>
                    </div>

                    <div className="flex-col justify-between items-center">
                        <div className="flex flex-col   items-center text-white">Coming Soon</div>
                    </div>

                    {/* {rankingData.length === 0 && (
                        <div className="flex-col justify-between items-center">
                            <div className="flex flex-col   items-center text-white">Nobodies here</div>
                        </div>
                    )}
                    {rankingData.length !== 0 && (
                        <div className="rounded-2xl p-2 bg-blue-400">
                            <table className="w-full ">
                                <thead className="text-[#ad14cf]">
                                    <tr>
                                        <th colSpan={1} className="border-b border-[#fff] py-2 w-1/2">
                                            Users
                                        </th>
                                        <th className="border-b border-[#fff] py-2 w-1/4">Bet Amounts</th>

                                    </tr>
                                </thead>
                                <tbody className="w-full">
                                    {rankingData.map((item, index) => (
                                        <tr>
                                            <td>
                                                {item.address}
                                            </td>
                                            <td>
                                                {item.amount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    )
}
