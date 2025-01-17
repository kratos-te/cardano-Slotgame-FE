/* eslint-disable @typescript-eslint/ban-types */
import { FC } from "react";
import { MinusIcon, PlusIcon } from "./SvgIcons";

interface CoinValueProps {
  title: string;
  coinValue: number;
  setCoinValue: Function;
  className: string;
}

const CoinValue: FC<CoinValueProps> = ({
  title,
  coinValue,
  setCoinValue,
  className,
}) => {
  const inc = () => {
    let val = coinValue;
    val++;
    setCoinValue(val);
  };

  const dec = () => {
    let val = coinValue;
    if (val - 1 > 0) val--;
    setCoinValue(val);
  };
  return (
    <div
      className={`flex items-center justify-center input-group ${className}`}
      title={title}
    >
      <button
        className="text-white w-8 h-6 text-[12px] rounded-l-3xl grid place-content-center hover:bg-yellow-600 duration-300 transition-all max-lg:text-[18px]"
        disabled={coinValue === 0}
        onClick={dec}
      >
        <MinusIcon color="#fff" />
      </button>
      <input
        className="value-input w-[72px] text-center py-0.5 text-[16px] font-bold text-white border border-yellow-300  bg-[#00000099]  max-lg:text-[14px] max-md:w-[56px] max-sm:w-[36px]"
        step={0.1}
        value={coinValue}
        onChange={(e) => setCoinValue(e.target.value)}
        type="number"
        min={0}
      />
      <button
        className="text-white w-8 h-6 text-[24px] rounded-r-3xl grid place-content-center hover:bg-yellow-600 duration-300 transition-all"
        disabled={coinValue === 50}
        onClick={inc}
      >
        <PlusIcon color="#fff" />
      </button>
    </div>
  );
};

export default CoinValue;
