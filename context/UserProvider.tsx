import React, { ReactNode, createContext, useState } from "react";
import { BalanceType } from "../utils/types";

// Define the shape of the context
export interface UserContextProps {
  setAddress: Function;
  walletBalance: BalanceType;
  setWalletBalance: Function;
  address: string;
  setUserWallet: Function;
  userwallet: any;
  isConnected: boolean;
  setIsConnected: Function;
}

// Create the User context
export const UserContext = createContext<UserContextProps | null>(null);

// Create the User context provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [walletBalance, setWalletBalance] = useState({
    ada: 0,
    nebula: 0,
    dum: 0,
    konda: 0
  });
  const [address, setAddress] = useState("");
  const [userwallet, setUserWallet] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  return (
    <UserContext.Provider
      value={{
        setAddress,
        walletBalance,
        setWalletBalance,
        address,
        userwallet,
        setUserWallet,
        isConnected,
        setIsConnected
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
