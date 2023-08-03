import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalProvider";
import {
  CardanoWallet,
  useWallet,
  useAddress,
  useLovelace
} from "@meshsdk/react";
import { backendGetNonce, backendVerifySignature } from "../backend";
import { UserContext } from "../context/UserProvider";
import { getAmount } from "../utils/api";
import { GameContext } from "../context/GameProvider";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = () => {
  const { wallet, connected } = useWallet();
  const { userAddress, setAddress, setUserWallet } =
    useContext<any>(UserContext);

  const { isFundModal, setIsFundModal } = useContext<any>(ModalContext);

  const { balance, setGameBalance, getGameBalance } = useContext<any>(GameContext);

  const [state, setState] = useState<number>(0);
  const address = useAddress();
  const lovelace = useLovelace();

  useEffect(() => {
    if (address && connected) {
      setAddress(address);
      setUserWallet(wallet);
      (async () => {
        const res = await getAmount(address);
        console.log("ok", res);
        if (res) {
          setGameBalance({
            ada: res.ada_balance,
            dum: res.dum_balance,
            nebula: res.nebula_balance,
            konda: res.konda_balance
          });
        }
      })();
    }
    if (typeof lovelace !== "undefined") {
      const result = parseInt(lovelace) / 1000000;
      console.log("balance>>>>", result.toString());
      setGameBalance(result.toString());
      // use the result here
    }
  }, [address, lovelace]);

  const handleConnected = () => {
    if(getGameBalance) {
      getGameBalance()
    }
  }

  return (
    <div className="fixed top-0 left-0 z-20 w-full px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex justify-between py-6">
          <div className="hue-rotate">
            <img src={"/images/title.png"} className="h-[60px]" alt="" />
          </div>
          <div className="flex items-center gap-2">
            {address && address !== "" &&
              <button
                className="text-sm font-black rounded-lg bg-[#e753ba] hover:bg-[#17d0e8] h-12 w-[120px] uppercase duration-300"
                onClick={() => setIsFundModal(true)}
              >
                deposit
              </button>
            }
            <div className="">
              <CardanoWallet
                // label="Connect"
                onConnected={handleConnected}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
