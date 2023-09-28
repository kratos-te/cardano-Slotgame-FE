import { useContext, useState } from "react";
import Image from "next/image";
import { ModalContext } from "../context/ModalProvider";
import {
  useWallet,
  useAddress,
} from "@meshsdk/react";
import ConnectWallet from "./ConnectWallet";
import bottomLogo from "../assets/images/bottom-logo.png";

interface HeaderProps {
  title: string;
}
// const myWallet =  BrowserWallet.enable('eternl');

const Header: React.FC<HeaderProps> = () => {
  const { wallet, connected } = useWallet();
  // const { getBalance } = useLovelace();

  const { setIsFundModal } = useContext<any>(ModalContext);

  const [state, setState] = useState<number>(0);
  const address = useAddress();

  return (
    <div className="fixed top-0 left-0 z-20 w-full px-6 max-[641px]:absolute">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex justify-between py-6 max-md:flex-col max-md:items-center">
          <div className="hue-rotate  pl-10 pb-5 z-50 flex space-x-3 items-center max-[440px]:pl-4">
            <a href="https://thenebula.org" target="_blank">
              <Image src={bottomLogo} width={100} height={100} />
            </a>
            <a href="https://thenebula.org" target="_blank">
              <p className="text-5xl text-white max-[440px]:hidden">
                {" "}
                Nebula Gaming
              </p>
            </a>
          </div>
          <div className="flex items-center gap-2 max-[450px]:hidden">
            {connected && (
              <>
                <button
                  className="text-sm font-black text-[#e753ba] rounded-lg bg-[#000000] hover:bg-[#17d0e8] h-12 w-[120px] uppercase duration-300"
                  onClick={() => setIsFundModal("withdraw")}
                >
                  withdraw
                </button>
                <button
                  className="text-sm font-black  rounded-lg bg-[#e753ba] hover:bg-[#17d0e8] h-12 w-[120px] uppercase duration-300"
                  onClick={() => setIsFundModal("deposit")}
                >
                  deposit
                </button>
              </>
            )}
            <div className="">
              <ConnectWallet />
            </div>
          </div>
          <div className="items-center min-[450px]:hidden max-[450px]:flex-col space-y-2">
            <div className="">
              <ConnectWallet />
            </div>
            {connected && (
              <>
                <button
                  className="text-sm font-black text-[#e753ba] rounded-lg bg-[#000000] hover:bg-[#17d0e8] h-12 w-full uppercase duration-300"
                  onClick={() => setIsFundModal("withdraw")}
                >
                  withdraw
                </button>
                <button
                  className="text-sm font-black rounded-lg bg-[#e753ba] hover:bg-[#17d0e8] h-12 w-full uppercase duration-300"
                  onClick={() => setIsFundModal("deposit")}
                >
                  deposit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;