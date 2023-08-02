import { useContext } from "react";
import { GameContext } from "../context/GameProvider";
import { TOKENS } from "../config";
import { DownArrow } from "./SvgIcons";

const TokenDropdown = () => {
  const { token, setToken } = useContext<any>(GameContext);

  return (
    <div
      className="left-24 text-[16px] font-bold text-yellow-300 absolute z-30 -bottom-11 flex items-center justify-center uppercase leading-[16px] w-[160px] text-center group"
      title="Active Token"
    >
      <label className="flex items-center text-xl">
        {token} <DownArrow className="group-hover:rotate-180" />
      </label>
      <div className="uppercase bg-[#431043] rounded-md absolute top-[28px] overflow-hidden invisible group-hover:visible">
        <ul className="flex flex-col">
          {TOKENS.map((item, key) => (
            <li
              className={`text-sm py-1.5 px-5 w-full ${
                token === item ? "active" : ""
              } hover:bg-[#2e0b2e] cursor-pointer`}
              onClick={() => setToken(item.symbol)}
              key={key}
            >
              {`${item.symbol}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TokenDropdown;
