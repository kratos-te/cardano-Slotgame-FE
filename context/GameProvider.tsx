import { useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from "react";
import { API_URL } from "../config";
import axios from "axios";
import { BalanceType, RankingDataType, TransactionType } from "../utils/types";
import { useAddress } from "@meshsdk/react";

// Define the shape of the context
export interface GameContextProps {
  wallet: any;
  gameBalance: BalanceType;
  getGameBalance: () => void;
  setGameBalance: (tokens: any) => void;
  token: string;
  setToken: (newToken: string) => void;
  spinStarted: boolean;
  spinEnded: boolean;
  setSpinStarted: Dispatch<SetStateAction<boolean>>;
  setSpinEnded: Dispatch<SetStateAction<boolean>>;
  // lbData: RankingDataType[];
  // setLbData: Dispatch<SetStateAction<RankingDataType[]>>;
  // getRankingData: () => void
  // getTransaction: () => void;
  // confirmTx: TransactionType
}


// Create the Game context
export const GameContext = createContext<GameContextProps | null>(null);

// Create the Game context provider component
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const walletAddress = useAddress();
  const [spinStarted, setSpinStarted] = useState(false);
  const [spinEnded, setSpinEnded] = useState(false);

  const [wallet, setWallet] = useState("");
  const [token, setToken] = useState("ada");
  const [gameBalance, setGameBalance] = useState({
    ada: 0,
    nebula: 0,
    dum: 0,
    konda: 0,
    snek: 0
  });
  // const [lbData, setLbData] = useState<RankingDataType[]>([])

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
    // console.log(wallet);
    const res = await axios.post(`${API_URL}/getAmount`, {
      wallet: wallet
    });
    const data = res.data;
    if (data !== -100) {
      setGameBalance({
        ada: data.ada_balance,
        dum: data.dum_balance,
        nebula: data.nebula_balance,
        konda: data.konda_balance,
        snek: data.snek_balance,
      });
    }
    return data;
  };

  // const getRankingData = async () => {
  //   const res = await axios.post(`${API_URL}/getRanking`);
  //   const data = res.data;
  //   if (data !== -100) {
  //     setLbData(data)
  //   }
  //   return data
  // }
  // const getTransaction = async () => {
  //   const res = await axios.post(`${API_URL}/getTransaction`, {
  //     wallet: wallet
  //   });
  //   console.log("res", res);
  //   const tx = res.data
  //   if(tx !== -100) {}
  //   setConfirmTx({
  //     address:tx.address,
  //     hash: tx.hash,
  //     status: tx.status
  //   })
  // }

  // useEffect(() => {
  // if (balanceQuery.data && wallet !== "") {
  //   const data = balanceQuery.data.data;
  //   if (data !== -100) {
  //     setGameBalance({
  //       ada: data.ada_balance,
  //       dum: data.dum_balance,
  //       nebula: data.nebula_balance,
  //       konda: data.konda_balance
  //     });
  //   }
  // }
  // }, [balanceQuery.data]);

  return (
    <GameContext.Provider
      value={{
        setSpinStarted,
        setSpinEnded,
        spinEnded,
        spinStarted,
        wallet,
        gameBalance,
        setGameBalance,
        getGameBalance,
        // getRankingData,
        // setLbData,
        // lbData,
        // getTransaction,

        // confirmTx,
        token,
        setToken
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
