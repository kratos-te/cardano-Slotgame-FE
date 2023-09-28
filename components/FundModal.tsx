import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { Transaction, BrowserWallet } from "@meshsdk/core";
import type { Asset } from '@meshsdk/core';
import { CloseIcon } from "./SvgIcons";
import { ModalContext } from "../context/ModalProvider";
import ClickAwayComponent from "./ClickAwayComponent";
import { depositFund, withdrawFund } from "../utils/api";
import { DEMO_WALLET, DUM_POLICY_ID, KONDA_POLICY_ID, NEBULA_POLICY_ID, SNEK_POLICY_ID } from "../config";
import { errorAlert, successAlert } from "./ToastGroup";
import { GameContext, GameContextProps } from "../context/GameProvider";
import { UserContext, UserContextProps } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { useWallet, useAddress } from "@meshsdk/react";
import { useWindowSize, generateRandomNumbers, sleep } from "../utils/util";

const FundModal: FC = () => {
  const { isFundModal, setIsFundModal } = useContext<any>(ModalContext);
  const { gameBalance, wallet } =
    useContext<GameContextProps | null>(GameContext) ?? {};

  const { address, userwallet } =
    useContext<UserContextProps | null>(UserContext) ?? {};

  const [isLoading, setIsLoading] = useState(false);

  const [tab, setTab] = useState("deposit");

  return isFundModal ? (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center text-white backdrop-blur-md">
      <ClickAwayComponent
        onClickAway={() => setIsFundModal(false)}
        disabled={isLoading}
      >
        <div className="w-[560px] bg-[#170b3b] p-6 rounded-2xl border-2 border-[#ffffff60] relative max-sm:w-[450px] max-[500px]:w-[380px] max-[400px]:w-[300px]">
          <button
            className="absolute right-5 top-5"
            onClick={() => setIsFundModal(false)}
            disabled={isLoading}
          >
            <CloseIcon color="#fff" />
          </button>

          {/* fund tabs beginning */}
          <button
            className={` text-sm px-4 py-2 rounded-t-md uppercase font-bold ${tab === "deposit"
              ? "bg-[#732e9f] text-[#fff]"
              : "bg-[#471368] text-[#000]"
              }`}
            onClick={() => setTab(isFundModal)}
            disabled={isLoading}
          >
            {isFundModal}
          </button>
          {/* <div className="inline-flex gap-1">
            <button
              className={` text-sm px-4 py-2 rounded-t-md uppercase font-bold ${
                tab === "deposit"
                  ? "bg-[#732e9f] text-[#fff]"
                  : "bg-[#471368] text-[#000]"
              }`}
              onClick={() => setTab(isFundModal)}
              disabled={isLoading}
            >
              deposit
            </button>
            <button
              className={` text-sm px-4 py-2 rounded-t-md uppercase font-bold ${
                tab === "withdraw"
                  ? "bg-[#732e9f] text-[#fff]"
                  : "bg-[#471368] text-[#000]"
              }`}
              onClick={() => setTab(isFundModal)}
              disabled={isLoading}
            >
              withdraw
            </button>
          </div> */}
          {/* fund tabs end */}
          {isFundModal === "deposit" && (
            <ActionForm
              type="deposit"
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {isFundModal === "withdraw" && (
            <ActionForm
              type="withdraw"
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      </ClickAwayComponent>
    </div>
  ) : (
    <></>
  );
};

export default FundModal;

const ActionForm = ({
  type,
  isLoading,
  setIsLoading
}: {
  type: string;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { wallet, connected } = useWallet();
  const address = useAddress();
  const { userwallet } = useContext<UserContextProps | null>(UserContext) ?? {};
  const { token, getGameBalance, gameBalance } = useContext<any>(GameContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("token", token)
    try {
      const values: Record<string, number> = {};

      for (const key in data) {
        const value = data[key];
        values[key] = value === "" ? 0 : parseInt(value, 10);
      }

      if (type === "deposit" && wallet) {
        if (values.ada > 0) {

          const tx = new Transaction({ initiator: wallet }).sendLovelace(
            DEMO_WALLET,
            (values.ada * 1000000).toString()
          ).sendAssets(
            DEMO_WALLET,
            [
              {
                unit: NEBULA_POLICY_ID,
                quantity: (values.nebula * 100000000).toString()
              },
              {
                unit: DUM_POLICY_ID,
                quantity: (values.dum * 100).toString()
              },
              {
                unit: KONDA_POLICY_ID,
                quantity: (values.konda).toString()
              },
              {
                unit: SNEK_POLICY_ID,
                quantity: (values.snek).toString()
              }
            ]
          );
          const unsignedTx = await tx.build();
          const signedTx = await wallet.signTx(unsignedTx);
          const txHash = await wallet.submitTx(signedTx);
          if (address) {
            const res = await depositFund(
              address,
              DEMO_WALLET,
              txHash,
              values.nebula,
              values.dum,
              values.konda,
              values.ada,
              values.snek
            );

            if (res == 200 || res == 504) {
              getGameBalance();
              successAlert("Deposit Success!");
              setIsLoading(false);
            }
          }
        } else {


          const tx = new Transaction({ initiator: wallet }).sendLovelace(
            DEMO_WALLET,
            (1 * 1000000).toString()
          ).sendAssets(
            DEMO_WALLET,
            [
              {
                unit: NEBULA_POLICY_ID,
                quantity: (values.nebula * 100000000).toString()
              },
              {
                unit: DUM_POLICY_ID,
                quantity: (values.dum * 100).toString()
              },
              {
                unit: KONDA_POLICY_ID,
                quantity: (values.konda).toString()
              },
              {
                unit: SNEK_POLICY_ID,
                quantity: (values.snek).toString()
              }
            ]
          );
          const unsignedTx = await tx.build();
          const signedTx = await wallet.signTx(unsignedTx);
          const txHash = await wallet.submitTx(signedTx);
          if (address) {
            const res = await depositFund(
              address,
              DEMO_WALLET,
              txHash,
              values.nebula,
              values.dum,
              values.konda,
              values.ada,
              values.snek
            );

            if (res == 200 || res == 504) {
              getGameBalance();
              successAlert("Deposit Success!");
              setIsLoading(false);
            }
          }
        }
      } else if (type === "withdraw" && address) {
        if (values.ada > gameBalance.ada) {
          errorAlert("Not enough balance to withdraw!");
          setIsLoading(false);
          return;
        }
        const res = await withdrawFund(
          address,
          values.nebula,
          values.dum,
          values.konda,
          values.ada,
          values.snek
        );
        if (res == 200 || res == 504) {
          getGameBalance();
          successAlert("Withdraw Success!");
          setIsLoading(false);
        }
        // successAlert("Withdraw Success!");
      }
    } catch (error) {
      console.log(`${type} error:`, error);
    }
    setIsLoading(false);
  };

  return (
    <form
      className="py-6 border-t-2 border-[#732e9f]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <BalanceList />
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
            placeholder="Input KONDA amount"
            type="number"
            {...register("konda", { required: false })}
          />
        </div>
        <div className="">
          <label htmlFor="snek" className="mb-2 text-sm font-bold uppercase">
            snek
          </label>
          <input
            className="p-3 value-input w-full py-0.5 text-[16px] font-bold text-white border border-yellow-300  bg-[#00000000] h-10"
            id="snek"
            placeholder="Input SNEK amount"
            type="number"
            {...register("snek", { required: false })}
          />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <button
          className="px-5 bg-[#4e2080] hover:bg-[#3b1762] py-2 uppercase border duration-300 w-[180px] cursor-pointer disabled:cursor-not-allowed"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? `${type}ing...` : type}

        </button>
        <div className="text-[10px] mx-10">
          Deposits may take up to 5 minutes
          closing this window may cause for the
          transation to cancel or malfunction
        </div>
      </div>
      <div className="mx-10 mt-4">
        <p className="text-[10px]">
          Following the deposit or withdrawal , please wait
          while the transaction is verified on the blockchain
        </p>
      </div>
    </form>
  );
};

const BalanceList = () => {
  const { gameBalance } = useContext<any>(GameContext);
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
        <div className="text-sm text-[#ddd] uppercase">
          snek:{" "}
          <span className="text-[#6673dc] font-black">
            {" "}
            {gameBalance.snek?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};