import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { Transaction, BrowserWallet } from "@meshsdk/core";
import { CloseIcon } from "./SvgIcons";
import { ModalContext } from "../context/ModalProvider";
import ClickAwayComponent from "./ClickAwayComponent";
import { depositFund, withdrawFund } from "../utils/api";
import { DEMO_WALLET } from "../config";
import { successAlert } from "./ToastGroup";
import { GameContext, GameContextProps } from "../context/GameProvider";
import { UserContext, UserContextProps } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { useWallet } from "@meshsdk/react";

const FundModal: FC = () => {
  const { isFundModal, setIsFundModal } = useContext<any>(ModalContext);
  const { gameBalance, wallet } =
    useContext<GameContextProps | null>(GameContext) ?? {};

  const { address, userwallet } =
    useContext<UserContextProps | null>(UserContext) ?? {};

  const [isLoading, setIsLoading] = useState(false)

  const [tab, setTab] = useState("deposit");


  return isFundModal ? (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center text-white backdrop-blur-md">
      <ClickAwayComponent onClickAway={() => setIsFundModal(false)}>
        <div className="w-[560px] bg-[#170b3b] p-6 rounded-2xl border-2 border-[#ffffff60] relative">
          <button
            className="absolute right-5 top-5"
            onClick={() => setIsFundModal(false)}
            disabled={isLoading}
          >
            <CloseIcon color="#fff" />
          </button>

          {/* fund tabs beginning */}
          <div className="inline-flex gap-1">
            <button
              className={` text-sm px-4 py-2 rounded-t-md uppercase font-bold ${tab === "deposit"
                ? "bg-[#732e9f] text-[#fff]"
                : "bg-[#471368] text-[#000]"
                }`}
              onClick={() => setTab("deposit")}
              disabled={isLoading}
            >
              deposit
            </button>
            <button
              className={` text-sm px-4 py-2 rounded-t-md uppercase font-bold ${tab === "withdraw"
                ? "bg-[#732e9f] text-[#fff]"
                : "bg-[#471368] text-[#000]"
                }`}
              onClick={() => setTab("withdraw")}
              disabled={isLoading}
            >
              withdraw
            </button>
          </div>
          {/* fund tabs end */}
          {tab === "deposit" && (
            <ActionForm type="deposit" isLoading={isLoading} setIsLoading={setIsLoading} />
          )}
          {tab === "withdraw" && (
            <ActionForm type="withdraw" isLoading={isLoading} setIsLoading={setIsLoading} />
          )}
        </div>
      </ClickAwayComponent>
    </div>
  ) : (
    <></>
  );
};

export default FundModal;

const ActionForm = ({ type, isLoading, setIsLoading }: { type: string, isLoading: boolean, setIsLoading: Dispatch<SetStateAction<boolean>> }) => {
  const { wallet, connected } = useWallet();
  const { address, userwallet } =
    useContext<UserContextProps | null>(UserContext) ?? {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {

      const values: Record<string, number> = {};

      for (const key in data) {
        const value = data[key];
        values[key] = value === '' ? 0 : parseInt(value, 10);
      }

      console.log(values)

      if (type === "deposit" && wallet) {
        const tx = new Transaction({ initiator: userwallet }).sendLovelace(
          DEMO_WALLET,
          (values.ada * 1000000).toString()
        );
        console.log("here", tx);
        const unsignedTx = await tx.build();
        const signedTx = await userwallet.signTx(unsignedTx);
        const txHash = await userwallet.submitTx(signedTx);

        console.log("here", txHash);
        if (address) {
          
          const res = await depositFund(
            address,
            DEMO_WALLET,
            txHash,
            values.nebula,
            values.dum,
            values.konda,
            values.ada
          );
        console.log(
          "send data???",
          wallet,
          values.nebula,
          values.dum,
          values.konda,
          values.ada
          );
          console.log("deposit data", res);
          if (res == 200)
          {
            successAlert("Deposit Success!");
            setIsLoading(false);
          }
        }
      } else if (type === "withdraw" && address) {
        console.log("handleWidraw", wallet);
        await withdrawFund(address, values.nebula, values.dum, values.konda, values.ada);
        successAlert("Withdraw Success!");
      }
    }
    catch (error) {
      console.log(`${type} error:`, error)
    }
    setIsLoading(false);
  }

  return (
    <form className="py-6 border-t-2 border-[#732e9f]" onSubmit={handleSubmit(onSubmit)}>
      <BlanceList />
      <div className="grid grid-cols-2 gap-4 my-4">
        <div className="">
          <label htmlFor="ada" className="mb-2 text-sm font-bold uppercase">
            ada
          </label>
          <input
            className="p-3 value-input w-full py-0.5 text-[16px] font-bold text-white border border-yellow-300  bg-[#00000000] h-10"
            id="ada"
            placeholder="Input ada amount"
            type="number"
            {...register("ada", { required: false })}
          />
        </div>
        <div className="">
          <label htmlFor="nebula" className="mb-2 text-sm font-bold uppercase">
            nebula
          </label>
          <input
            className="p-3 value-input w-full py-0.5 text-[16px] font-bold text-white border border-yellow-300  bg-[#00000000] h-10"
            id="nebula"
            placeholder="Input Nebula amount"
            type="number"
            {...register("nebula", { required: false })}
          />
        </div>
        <div className="">
          <label htmlFor="dum" className="mb-2 text-sm font-bold uppercase">
            dum
          </label>
          <input
            className="p-3 value-input w-full py-0.5 text-[16px] font-bold text-white border border-yellow-300  bg-[#00000000] h-10"
            id="dum"
            placeholder="Input DUM amount"
            type="number"
            {...register("dum", { required: false })}
          />
        </div>
        <div className="">
          <label htmlFor="konda" className="mb-2 text-sm font-bold uppercase">
            konda
          </label>
          <input
            className="p-3 value-input w-full py-0.5 text-[16px] font-bold text-white border border-yellow-300  bg-[#00000000] h-10"
            id="konda"
            placeholder="Input SNEK amount"
            type="number"
            {...register("konda", { required: false })}
          />
        </div>
      </div>
      <button
        className="px-5 bg-[#4e2080] hover:bg-[#3b1762] py-2 uppercase border duration-300 w-[180px] cursor-pointer disabled:cursor-not-allowed"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "depositing..." : "deposit"}
      </button>
    </form>
  )
}


const BlanceList = () => {
  const { gameBalance } = useContext<any>(GameContext)
  return gameBalance ? (
    <div className="tracking-wider">
      <p>Your current game balance: </p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="text-sm text-[#ddd] uppercase">
          ada:{" "}
          <span className="text-[#6673dc] font-black">
            {" "}
            {gameBalance.ada?.toLocaleString()}
          </span>
        </div>
        <div className="text-sm text-[#ddd] uppercase">
          nebula:{" "}
          <span className="text-[#6673dc] font-black">
            {" "}
            {gameBalance.nebula?.toLocaleString()}
          </span>
        </div>
        <div className="text-sm text-[#ddd] uppercase">
          dum:{" "}
          <span className="text-[#6673dc] font-black">
            {" "}
            {gameBalance.dum?.toLocaleString()}
          </span>
        </div>
        <div className="text-sm text-[#ddd] uppercase">
          konda:{" "}
          <span className="text-[#6673dc] font-black">
            {" "}
            {gameBalance.konda?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};