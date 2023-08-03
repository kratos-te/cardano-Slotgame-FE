import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";
import { BalanceType } from "../utils/types";
import { useAddress } from "@meshsdk/react";

// Define the shape of the context
export interface GameContextProps {
  wallet: any;
  gameBalance: BalanceType;
  getGameBalance: () => void;
  setGameBalance: (tokens: any) => void;
  token: string;
  setToken: (newToken: string) => void;
}

// Create the Game context
export const GameContext = createContext<GameContextProps | null>(null);

// Create the Game context provider component
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const walletAddress = useAddress();

  const [wallet, setWallet] = useState("");
  const [token, setToken] = useState("ada");
  const [gameBalance, setGameBalance] = useState({
    ada: 0,
    nebula: 0,
    dum: 0,
    konda: 0
  });

  useEffect(() => {
    if (walletAddress) {
      setWallet(walletAddress);
    }
  }, [walletAddress]);

  const balanceQuery = useQuery({
    queryKey: ["balance-data", walletAddress],
    queryFn: async () =>
      await axios.post(`${API_URL}/getAmount`, {
        wallet: walletAddress
      })
  });

  const getGameBalance = async () => {
    console.log(wallet);
    const res = await axios.post(`${API_URL}/getAmount`, {
      wallet: wallet
    });
    const data = res.data;
    if (data !== -100) {
      setGameBalance({
        ada: data.ada_balance,
        dum: data.dum_balance,
        nebula: data.nebula_balance,
        konda: data.konda_balance
      });
    }
  };

  useEffect(() => {
    if (balanceQuery.data && wallet !== "") {
      const data = balanceQuery.data.data;
      if (data !== -100) {
        setGameBalance({
          ada: data.ada_balance,
          dum: data.dum_balance,
          nebula: data.nebula_balance,
          konda: data.konda_balance
        });
      }
    }
  }, [balanceQuery.data]);

  return (
    <GameContext.Provider
      value={{
        wallet,
        gameBalance,
        setGameBalance,
        getGameBalance,
        token,
        setToken
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
