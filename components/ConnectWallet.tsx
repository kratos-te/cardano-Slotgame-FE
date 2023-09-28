import { useState, useEffect, useContext } from "react";
import { useWallet, useWalletList, useAddress } from "@meshsdk/react";
import Image from "next/image";
import { DownArrow } from "./SvgIcons";
import { UserContext } from "../context/UserProvider";
import { getAmount } from "../utils/api";
import { GameContext } from "../context/GameProvider";

const ConnectWallet = () => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  const { connect, disconnect, connecting, wallet, connected } = useWallet();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userAddress, setAddress, setUserWallet, setIsConnected } =
    useContext<any>(UserContext);
  const { setGameBalance } = useContext<any>(GameContext);
  const [currentBalance, setCurrentBalance] = useState<number>();
  const walletLists = useWalletList();
  const address = useAddress();

  useEffect(() => {
    const storedWallet = localStorage.getItem("selectedWallet");
    if (storedWallet) {
      setSelectedWallet(JSON.parse(storedWallet));
      connect(JSON.parse(storedWallet).name);
    }
  }, []);

  useEffect(() => {
    console.log("address connected>>>", address);
    if (connected && address) {
      (async () => {
        const res = await getAmount(address);
    console.log("game balance", res)
        
        setInterval(async () => {
          const balance = await wallet.getBalance();
          setCurrentBalance(balance[0].quantity / 1000000);
        }, 1000);
        if (res) {
          setGameBalance({
            ada: res.ada_balance,
            dum: res.dum_balance,
            nebula: res.nebula_balance,
            konda: res.konda_balance,
            snek: res.snek_balance
          });
        }
      })();
    }
  }, [wallet, address]);

  const handleWalletSelection = async (myWallet: any) => {
    localStorage.setItem("selectedWallet", JSON.stringify(myWallet));
    setSelectedWallet(myWallet);
    connect(myWallet.name);
    setAddress(address);
    setUserWallet(wallet);

    if (myWallet && address) {
      setIsConnected(true);
      const res = await getAmount(address);
      if (res) {
        setGameBalance({
          ada: res.ada_balance,
          dum: res.dum_balance,
          nebula: res.nebula_balance,
          konda: res.konda_balance
        });
      }
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem("selectedWallet");
    disconnect();
    setSelectedWallet(null);
  };
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="flex items-center text-sm font-black rounded-lg border-2 border-white h-12  uppercase duration-300 px-8 py-2 text-white group relative"
        onClick={() => handleDropdown()}
        style={{
          width: connected ? 180 : "auto"
        }}
      >
        {connected ? (
          currentBalance?.toFixed(2) + " " + "ADA"
        ) : (
          <>
            Connect Wallet <DownArrow className="group-hover:rotate-180" />
          </>
        )}
        {connected && (
          <div className="hidden group-hover:block absolute left-0 top-[40px] w-full">
            {selectedWallet && (
              <button
                className="text-white border-2 py-2.5 px-5 rounded-md cursor-pointer capitalize mt-2.5 w-full"
                onClick={() => handleDisconnect()}
              >
                disconnect
              </button>
            )}
          </div>
        )}
      </button>
      {!connected && isOpen && (
        <div className="text-sm font-black h-12 uppercase  duration-300 bg-black/70">
          {!selectedWallet && !connecting && (
            <ul className="px-4 border-2 border-white rounded-lg bg-black/70">
              {walletLists.map((walletlist) => (
                <li
                  className="flex space-x-2 items-center py-2 bg-black/70"
                  key={walletlist.name}
                  onClick={() => handleWalletSelection(walletlist)}
                >
                  <Image
                    src={walletlist.icon}
                    alt={walletlist.name}
                    width="30"
                    height="30"
                  />
                  <span className="text-white h-12 py-3">
                    {walletlist.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default ConnectWallet;
