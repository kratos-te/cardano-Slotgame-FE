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
  const { balance, setGameBalance } = useContext<any>(GameContext);

  const [state, setState] = useState<number>(0);

  const address = useAddress();
  const lovelace = useLovelace();

  useEffect(() => {
    if (address) {
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
  // const lovelace = useLovelace();
  // if (typeof lovelace !== "undefined") {
  //   const result = parseInt(lovelace) / 1000000;
  //   console.log("balance>>>>", result);
  //   // use the result here
  // }

  async function frontendStartLoginProcess() {
    if (connected) {
      setState(1);
      const userAddress = (await wallet.getRewardAddresses())[0];
      const res = await backendGetNonce(userAddress);
      await frontendSignMessage(res.nonce);
    }
  }

  async function frontendSignMessage(nonce: string) {
    try {
      const userAddress = (await wallet.getRewardAddresses())[0];
      const signature = await wallet.signData(userAddress, nonce);
      const res = await backendVerifySignature(nonce, userAddress, signature);
      if (res.result === true) {
        setState(2);
      } else {
        setState(3);
      }
    } catch (error) {
      setState(0);
    }
  }
  const { isFundModal, setIsFundModal } = useContext<any>(ModalContext);

  return (
    <div className="fixed top-0 left-0 z-20 w-full">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex justify-between py-6">
          <div className="hue-rotate">
            <img src={"/images/title.png"} className="h-[60px]" alt="" />
          </div>
          <div className="flex items-center gap-2">
            <button
              className="text-sm font-black rounded-lg bg-[#e753ba] hover:bg-[#17d0e8] h-12 w-[120px] uppercase duration-300"
              onClick={() => setIsFundModal(true)}
            >
              deposit
            </button>
            <div className="">
              {state == 0 && (
                <CardanoWallet
                  label="Sign In"
                  onConnected={() => frontendStartLoginProcess()}
                />
              )}
              {state == 1 && <div>Signing in...</div>}
              {state == 2 && (
                <div className="mr-wallet-button pt-4">
                  {address?.slice(0, 5)}....{" "}
                  {address?.slice(address.length - 5, address.length)}
                </div>
              )}
              {state == 3 && (
                <div className="mr-wallet-button">Signed in failed</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
