/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect, useContext } from "react";
import CoinValue from "./CoinValue";
import SlotCell from "./SlotCell";
import { SYMBOLS, SNEK_SYMBOLS, SymbolItem } from "./Symbols";
import WinsChart from "./WinsChart";
import { useWindowSize, generateRandomNumbers, sleep } from "../utils/util";
import WinPopup from "./WinPopup";
import { Howl } from "howler";
import { DELAY_TIME, DEMO_WALLET, SPIN_TIME } from "../config";
import { play, getAmount, getRankingData } from "../utils/api";
import { GameContext } from "../context/GameProvider";
import { BalanceType, RankingDataType } from "../utils/types";
import TokenDropdown from "./TokenDropdown";
import { errorAlert, successAlert, warningAlert } from "./ToastGroup";
import { useWallet } from "@meshsdk/react";
import bottomLogo from "../assets/images/bottom-logo.png";
import GameFee from "./GameFee";
import { LeaderBoard } from "./LeaderBoard";

const SlotsContainer: React.FC = () => {
  const { connected } = useWallet();
  const { width } = useWindowSize();
  const [positionY, setPositionY] = useState(0);
  const { token, getGameBalance, gameBalance, wallet } =
    useContext<any>(GameContext);

  const [spined, setSpined] = useState(false);
  const [blur, setBlur] = useState(10);
  const [randomFlag, setRandomFlag] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [coinValue, setCoinValue] = useState<number>(10);

  const [isStarted, setIsStarted] = useState(false);

  const [isWinsChart, setIsWinsChart] = useState(false);
  const [isWinModal, setIsWinModal] = useState(false);
  const [isGameFee, setIsGameFee] = useState(false);
  const [isLeaderboard, setIsLeaderboard] = useState(false);

  const [isSpinMoveEnd, setIsSpinMoveEnd] = useState(true);
  const [rewardSymbols, setRewardSymbols] = useState<any>([]);
  const [firstSpin, setFirstSpin] = useState(generateRandomNumbers(15));
  const [spinResult, setSpinResult] = useState<any>([]);
  const [prevSpinResult, setPrevSpinResult] = useState<any>([]);
  const [lbData, setLbData] = useState<RankingDataType[]>([])


  const [tempBalance, setTempBalance] = useState({
    ada: 0,
    nebula: 0,
    dum: 0,
    konda: 0,
    snek: 0
  });

  const playSound = new Howl({
    src: "/sounds/play-3.wav"
  });

  const [gameResult, setGameResult] = useState({
    getAmount: 0,
    multiplier: 0
  });

  const onReset = () => {
    setIsSpinMoveEnd(true);
    playSound.stop();
    setIsReset(true);
    setPositionY(0);
    if (getGameBalance) getGameBalance();
    // if (getRankingData)  getRankingData()
  };

  const gameHeight = useMemo(() => {
    let h = 0;
    if (width > 1024) {
      h = 7210;
      return h;
    } else if (width > 768) {
      h = 5750;
      return h;
    } else if (width > 640) {
      h = 4800;
      return h;
    } else if (width > 450) {
      h = 3830;
      return h;
    } else if (width > 400) {
      h = 3830;
      return h;
    } else {
      h = 3840;
      return h;
    }
  }, [width]);

  const spinEffect = async (time: number) => {
    await sleep(1);
    playSound.play();
    setIsSpinMoveEnd(false);
    setIsReset(false);
    setBlur(0);
    setRandomFlag(!randomFlag);
    if (gameHeight) {
      setPositionY(gameHeight);
    }
    await sleep(time);
    setIsSpinMoveEnd(true);
  };

  const handleSpin = async () => {
    console.log("spin result", spinResult);
    setIsStarted(true);

    const value = coinValue.toString();
    if (connected && wallet) {
      const { ada, nebula, dum, konda, snek } = gameBalance;
      let tempBalance;

      switch (token) {
        case "ada":
          if (ada < coinValue) {
            errorAlert("Deposit more or Decrease bet amount");
            tempBalance = { ada, nebula, dum, konda, snek };
          } else {
            tempBalance = { ada: ada - coinValue, nebula, dum, konda, snek };
            setTempBalance(tempBalance);
            setPrevSpinResult(spinResult);
            setSpined(true);

            const res = await play(wallet as unknown as string, token, coinValue.toString());

            if (res && res.result) {
              setSpinResult(res.result);
              setGameResult({
                getAmount: res.bet.getAmount,
                multiplier: res.bet.multiplier,
              });
            }

            onReset();
            spinEffect(20000);
            getGameBalance();
            // getRankingData()
          }
          break;
        case "nebula":
          if (nebula < coinValue) {
            errorAlert("Deposit more or Decrease bet amount");
            tempBalance = { ada, nebula, dum, konda, snek };
          } else {
            tempBalance = { ada: ada - 1, nebula: nebula - coinValue, dum, konda, snek };
            setTempBalance(tempBalance);
            setPrevSpinResult(spinResult);
            setSpined(true);

            const res = await play(wallet as unknown as string, token, coinValue.toString());

            if (res && res.result) {
              setSpinResult(res.result);
              setGameResult({
                getAmount: res.bet.getAmount,
                multiplier: res.bet.multiplier,
              });
            }

            onReset();
            spinEffect(20000);
            getGameBalance();
            // getRankingData()
          }
          break;
        case "konda":
          if (konda < coinValue) {
            errorAlert("Deposit more or Decrease bet amount");
            tempBalance = { ada, nebula, dum, konda, snek };
          } else {
            tempBalance = { ada: ada - 2, nebula, dum, konda: konda - coinValue, snek };
            setTempBalance(tempBalance);
            setPrevSpinResult(spinResult);
            setSpined(true);

            const res = await play(wallet as unknown as string, token, coinValue.toString());


            if (res && res.result) {
              setSpinResult(res.result);
              setGameResult({
                getAmount: res.bet.getAmount,
                multiplier: res.bet.multiplier,
              });
            }

            onReset();
            spinEffect(20000);
            getGameBalance();
            // getRankingData()
          }
          break;
        case "dum":
          if (dum < coinValue) {
            errorAlert("Deposit more or Decrease bet amount");
            tempBalance = { ada, nebula, dum, konda, snek };
          } else {
            tempBalance = { ada: ada - 2, nebula, dum: dum - coinValue, konda, snek };
            setTempBalance(tempBalance);
            setPrevSpinResult(spinResult);
            setSpined(true);


            const res = await play(wallet as unknown as string, token, coinValue.toString());


            if (res && res.result) {
              setSpinResult(res.result);
              setGameResult({
                getAmount: res.bet.getAmount,
                multiplier: res.bet.multiplier,
              });
            }

            onReset();
            spinEffect(20000);
            getGameBalance();
            // getRankingData()
          }
          break;
        case "snek":
          if (snek < coinValue) {
            errorAlert("Deposit more or Decrease bet amount");
            tempBalance = { ada, nebula, dum, konda, snek };
          } else {
            tempBalance = { ada: ada, nebula, dum, konda, snek: snek - coinValue - 1000 };
            setTempBalance(tempBalance);
            setPrevSpinResult(spinResult);
            setSpined(true);

            const res = await play(wallet as unknown as string, token, coinValue.toString());
            console.log("result", res.bet);

            if (res && res.result) {
              setSpinResult(res.result);
              setGameResult({
                getAmount: res.bet.getAmount,
                multiplier: res.bet.multiplier,
              });
            }

            onReset();
            spinEffect(20000);
            getGameBalance();
            // getRankingData()
          }
          break;
        default:
          errorAlert("Invalid token type");
          return;
      }
    } else if (!connected && !wallet) {
      errorAlert("Please connect wallet");
    }
  };


  const cells = useMemo(() => {
    console.log("prevSpinResult", prevSpinResult);
    const list: any[] = [];
    if (token === "snek") {
      console.log("token", token)
      Array.from({ length: 5 }, () => {
        const cellRow = SNEK_SYMBOLS.concat(SNEK_SYMBOLS).slice(); // Create a copy of SNEK_SYMBOLS array
        // A function that randomly changes the order of cellRow items
        for (let i = cellRow.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cellRow[i], cellRow[j]] = [cellRow[j], cellRow[i]];
        }
        list.push(cellRow);
      });
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < 3; j++) {
          const d = SNEK_SYMBOLS.find(
            (symbol) => symbol.id === prevSpinResult[i * 3 + j]
          );
          if (d) {
            list[i][j] = d;
          }
        }
      }

      const resArray = [];
      const rewards = [];

      for (let i = 0; i < 5; i++) {
        if (!isStarted) {
          const item = firstSpin.slice(i * 3, i * 3 + 3);
          const s = [];
          for (let j = 0; j < 3; j++) {
            const d = SNEK_SYMBOLS.find((symbol) => symbol.id === item[j]);
            if (item[j] === 0) {
              rewards.push(SNEK_SYMBOLS.find((symbol) => symbol.id === 0));
            }
            if (d) {
              s.push(d);
            }
          }
          if (s.length === 3) {
            resArray[i] = [...list[i], ...s];
          }
          if (item) list[i] = [...list[i], ...(item as unknown as SymbolItem[])];
        } else {
          const item = spinResult.slice(i * 3, i * 3 + 3);
          const s = [];
          for (let j = 0; j < 3; j++) {
            const d = SNEK_SYMBOLS.find((symbol) => symbol.id === item[j]);
            if (item[j] === 0) {
              rewards.push(SNEK_SYMBOLS.find((symbol) => symbol.id === 0));
            }
            if (d) {
              s.push(d);
            }
          }
          if (s.length === 3) {
            resArray[i] = [...list[i], ...s];
          }
          if (item) list[i] = [...list[i], ...(item as unknown as SymbolItem[])];
        }
      }
      setRewardSymbols(rewards);
      return resArray;
    } else {

      Array.from({ length: 5 }, () => {
        const cellRow = SYMBOLS.concat(SYMBOLS).slice(); // Create a copy of SYMBOLS array
        // A function that randomly changes the order of cellRow items
        for (let i = cellRow.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cellRow[i], cellRow[j]] = [cellRow[j], cellRow[i]];
        }
        list.push(cellRow);
      });
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < 3; j++) {
          const d = SYMBOLS.find(
            (symbol) => symbol.id === prevSpinResult[i * 3 + j]
          );
          if (d) {
            list[i][j] = d;
          }
        }
      }

      const resArray = [];
      const rewards = [];

      for (let i = 0; i < 5; i++) {
        if (!isStarted) {
          const item = firstSpin.slice(i * 3, i * 3 + 3);
          const s = [];
          for (let j = 0; j < 3; j++) {
            const d = SYMBOLS.find((symbol) => symbol.id === item[j]);
            if (item[j] === 0) {
              rewards.push(SYMBOLS.find((symbol) => symbol.id === 0));
            }
            if (d) {
              s.push(d);
            }
          }
          if (s.length === 3) {
            resArray[i] = [...list[i], ...s];
          }
          if (item) list[i] = [...list[i], ...(item as unknown as SymbolItem[])];
        } else {
          const item = spinResult.slice(i * 3, i * 3 + 3);
          const s = [];
          for (let j = 0; j < 3; j++) {
            const d = SYMBOLS.find((symbol) => symbol.id === item[j]);
            if (item[j] === 0) {
              rewards.push(SYMBOLS.find((symbol) => symbol.id === 0));
            }
            if (d) {
              s.push(d);
            }
          }
          if (s.length === 3) {
            resArray[i] = [...list[i], ...s];
          }
          if (item) list[i] = [...list[i], ...(item as unknown as SymbolItem[])];
        }
      }
      setRewardSymbols(rewards);
      return resArray;
    }


  }, [randomFlag, spinResult, token]);

  useEffect(() => {

    const runWinEffect = async () => {
      if (isStarted && gameResult.multiplier > 0) {
        console.log("win modal show!");
        await sleep(SPIN_TIME);
        // setIsSpinMoveEnd(true);
        playSound.stop();
        await sleep(DELAY_TIME);
        setIsWinModal(true);
        successAlert("Out of this World!");
        setIsSpinMoveEnd(true);
        // await sleep(3000);
        if (getGameBalance) getGameBalance();
        // if( getRankingData) getRankingData()
      }
    };
    runWinEffect();
  }, [gameResult.multiplier]);

  useEffect(() => {
    if (
      !isWinModal &&
      isStarted &&
      isSpinMoveEnd &&
      gameResult.getAmount === 0 &&
      !isReset
    ) {
      warningAlert("Better Luck Next Time");
      if (getGameBalance) getGameBalance();
      // if( getRankingData) getRankingData()
    }
  }, [isSpinMoveEnd, gameResult.getAmount]);

  const handleSetMin = () => {
    if (token === "ada") {
      setCoinValue(3)
    }
    if (token === "nebula") {
      setCoinValue(1000)
    }
    if (token === "konda") {
      setCoinValue(10000)
    }
    if (token === "dum") {
      setCoinValue(100)
    }
    if (token === "snek") {
      setCoinValue(5000)
    }
  }
  const handleSetHalf = () => {
    if (token === "ada") {
      if (coinValue < 3) {
        setCoinValue(3)
      }
      setCoinValue(coinValue / 2)
    }
    if (token === "nebula") {
      if (coinValue < 1000) {
        setCoinValue(1000)
      }
      setCoinValue(coinValue / 2)
    }
    if (token === "konda") {
      if (coinValue < 10000) {
        setCoinValue(10000)
      }
      setCoinValue(coinValue / 2)
    }
    if (token === "dum") {
      if (coinValue < 100) {
        setCoinValue(100)
      }
      setCoinValue(coinValue / 2)
    }
    if (token === "snek") {
      if (coinValue < 5000) {
        setCoinValue(5000)
      }
      setCoinValue(coinValue / 2)
    }
  }
  const handleSetDouble = () => {
    if (token === "ada") {
      if (coinValue > 50) {
        setCoinValue(50)
      }
      setCoinValue(coinValue * 2)
    }
    if (token === "nebula") {
      if (coinValue > 100000) {
        setCoinValue(100000)
      }
      setCoinValue(coinValue * 2)
    }
    if (token === "konda") {
      if (coinValue > 10000) {
        setCoinValue(500000)
      }
      setCoinValue(coinValue * 2)
    }
    if (token === "dum") {
      if (coinValue > 25000) {
        setCoinValue(25000)
      }
      setCoinValue(coinValue * 2)
    }
    if (token === "snek") {
      if (coinValue > 1000000) {
        setCoinValue(1000000)
      }
      setCoinValue(coinValue * 2)
    }

  }
  const handleSetMax = () => {
    if (token === "ada") {
      setCoinValue(50)
    }
    if (token === "nebula") {
      setCoinValue(100000)
    }
    if (token === "konda") {
      setCoinValue(500000)
    }
    if (token === "dum") {
      setCoinValue(25000)
    }
    if (token === "snek") {
      setCoinValue(1000000)
    }
  }

  useEffect(() => {
    if (token === "ada") {
      if (coinValue < 3) {
        setCoinValue(3)
      } else if (coinValue > 50
      ) {
        setCoinValue(50)
      }
    }
    if (token === "nebula") {
      if (coinValue < 1000) {
        setCoinValue(1000)
      } else if (coinValue > 100000
      ) {
        setCoinValue(100000)
      }
    }
    if (token === "konda") {
      if (coinValue < 10000) {
        setCoinValue(10000)
      } else if (coinValue > 500000
      ) {
        setCoinValue(500000)
      }
    }
    if (token === "dum") {

      if (coinValue < 100) {
        setCoinValue(100)
      } else if (coinValue > 25000
      ) {
        setCoinValue(25000)
      }
    }
    if (token === "snek") {

      if (coinValue < 5000) {
        setCoinValue(5000)
      } else if (coinValue > 1000000
      ) {
        setCoinValue(1000000)
      }
    }
  }, [coinValue])
  useEffect(() => {
    if (token === "ada") {
      setCoinValue(10)
    }
    if (token === "nebula") { setCoinValue(5000) }
    if (token === "konda") { setCoinValue(30000) }
    if (token === "dum") {
      setCoinValue(500)
    }
    if (token === "snek") {

      setCoinValue(15000)
    }
  }, [token])

  const handleOpenLeaderboard = async () => {
    const rankingData = await getRankingData()
    console.log("rankingData", rankingData)
    setLbData(rankingData)
    setIsLeaderboard(true)
  }
  return (
    <>
      <div className="absolute top-8 left-0 z-10 flex flex-col items-center justify-center w-full h-full backdrop-blur-md  max-[1030px]:top-40 max-md:top-60 max-[641px]:relative max-[641px]:-top-40 max-sm:-top-40 max-[450px]:pt-40">
        <div className="flex flex-col items-center">
          {connected && (
            <div className="flex items-center px-10 mb-20 cell-border  flex-col w-full max-md:w-[550px] max-md:mt-12 max-sm:w-[380px] max-sm:px-0  max-[400px]:w-[300px] max-[400px]:mt-24 max-[300px]:mt-36">
              <span className="border-span" />
              <span className="border-span" />
              <span className="border-span" />
              <span className="border-span" />
              <div className="font-black uppercase text-[#b5994d] hue-rotate mr-10 max-sm:hidden">
                balance
              </div>
              <div className="flex-col w-full items-center gap-4 max-lg:gap-2 max-md:flex-col max-sm:text-[8px]">
                <div className="flex justify-between px-4 gap-4 max-lg:gap-2 max-sm:px-2">

                  <div className="font-black uppercase text-[#fff] flex items-center gap-2 max-lg:gap-2">
                    <div className="text-sm text-center max-sm:hidden">ada:</div>
                    <div className="text-sm text-center min-[640px]:hidden">A:</div>

                    <div
                      className={`text-xl text-left text-[yellow] w-[100px] max-lg:text-base max-lg:w-[70px] max-[400px]:text-[12px]`}
                    >
                      {!isStarted && gameBalance.ada.toFixed(2)}
                      {gameResult.multiplier !== 0 &&
                        !isSpinMoveEnd &&
                        tempBalance.ada.toFixed(2)}
                      {gameResult.multiplier !== 0 &&
                        isSpinMoveEnd &&
                        gameBalance.ada.toFixed(2)}
                      {gameResult.multiplier == 0 &&
                        isStarted &&
                        tempBalance.ada.toFixed(2)}
                    </div>
                  </div>
                  <div className="font-black uppercase text-[#fff] flex items-center gap-2 max-lg:gap-2">
                    <div className="text-sm text-center max-sm:hidden">nebula:</div>
                    <div className="text-sm text-center min-[640px]:hidden">n:</div>

                    <div className="text-xl text-left text-[yellow] w-[100px] max-lg:text-base max-lg:w-[70px] max-[400px]:text-[12px]">
                      {!isStarted && gameBalance.nebula}
                      {gameResult.multiplier !== 0 &&
                        !isSpinMoveEnd &&
                        tempBalance.nebula}
                      {gameResult.multiplier !== 0 &&
                        isSpinMoveEnd &&
                        gameBalance.nebula}
                      {gameResult.multiplier == 0 &&
                        isStarted &&
                        tempBalance.nebula}
                    </div>
                  </div>
                  <div className="font-black uppercase text-[#fff] flex items-center gap-2 max-lg:gap-2">
                    <div className="text-sm text-center max-sm:hidden">snek:</div>
                    <div className="text-sm text-center min-[640px]:hidden">s:</div>
                    <div className="text-xl text-left text-[yellow] w-[100px] max-lg:text-base max-lg:w-[70px] max-[400px]:text-[12px]">
                      {!isStarted && gameBalance.snek}
                      {gameResult.multiplier !== 0 &&
                        !isSpinMoveEnd &&
                        tempBalance.snek}
                      {gameResult.multiplier !== 0 &&
                        isSpinMoveEnd &&
                        gameBalance.snek}
                      {gameResult.multiplier == 0 &&
                        isStarted &&
                        tempBalance.snek}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-24 gap-4 max-lg:gap-2 max-sm:px-10 ">
                  <div className="font-black uppercase text-[#fff] flex items-center gap-2 max-lg:gap-2">
                    <div className="text-sm text-center max-sm:hidden">konda:</div>
                    <div className="text-sm text-center min-[640px]:hidden">k:</div>

                    <div className="text-xl text-left text-[yellow] w-[100px] max-lg:text-base max-lg:w-[70px] max-[400px]:text-[12px]">
                      {!isStarted && gameBalance.konda}
                      {gameResult.multiplier !== 0 &&
                        !isSpinMoveEnd &&
                        tempBalance.konda}
                      {gameResult.multiplier !== 0 &&
                        isSpinMoveEnd &&
                        gameBalance.konda}
                      {gameResult.multiplier == 0 &&
                        isStarted &&
                        tempBalance.konda}
                    </div>
                  </div>

                  <div className="font-black uppercase text-[#fff] flex items-center gap-2 max-lg:gap-2">
                    <div className="text-sm text-center max-sm:hidden">dum:</div>
                    <div className="text-sm text-center min-[640px]:hidden">d:</div>
                    <div className="text-xl text-left text-[yellow] w-[100px] max-lg:text-base max-lg:w-[70px] max-[400px]:text-[12px]">
                      {!isStarted && gameBalance.dum}
                      {gameResult.multiplier !== 0 &&
                        !isSpinMoveEnd &&
                        tempBalance.dum}
                      {gameResult.multiplier !== 0 &&
                        isSpinMoveEnd &&
                        gameBalance.dum}
                      {gameResult.multiplier == 0 &&
                        isStarted &&
                        tempBalance.dum}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="">
            <div className="w-[800px] relative max-lg:w-[600px] max-md:w-[460px] max-sm:w-[320px] max-[400px]:w-[300px]">
              {token === "snek" ? <img
                src={"./images/Snek.png"}
                className="absolute max-w-[1040px] w-[1040px] h-[690px] -top-[115px] -left-[115px] z-20 max-lg:w-[790px] max-lg:h-[570px] max-lg:-left-[95px] max-lg:-top-[95px] max-md:w-[610px] max-md:h-[455px] max-md:-top-[65px] max-md:-left-[65px] max-sm:w-[415px] max-sm:h-[380px] max-sm:-top-[50px] max-sm:-left-[40px] max-[450px]:hidden"
                alt=""
              /> : <img
                src={"./images/border.png"}
                className="absolute max-w-[915px] w-[915px] h-[585px] -top-[62px] -left-[55px] z-20 hue-rotate max-lg:w-[700px] max-lg:h-[500px] max-lg:-left-[50px] max-md:w-[550px] max-md:h-[400px] max-md:-top-[45px] max-md:-left-[35px] max-sm:w-[380px] max-sm:h-[350px] max-sm:-top-[40px] max-sm:-left-[25px] max-[450px]:hidden"
                alt=""
              />}
              {/* <img
                src={"./images/border.png"}
                className="absolute max-w-[915px] w-[915px] h-[585px] -top-[62px] -left-[55px] z-20 hue-rotate max-lg:w-[700px] max-lg:h-[500px] max-lg:-left-[50px] max-md:w-[550px] max-md:h-[400px] max-md:-top-[45px] max-md:-left-[35px] max-sm:w-[380px] max-sm:h-[350px] max-sm:-top-[40px] max-sm:-left-[25px] max-[450px]:hidden"
                alt=""
              /> */}
              <div className="absolute left-0 z-30 -top-20 max-sm:-top-14">
                <p className="text-sm text-white -ml-4 max-sm:hidden max-sm:ml-0">
                  PAY TABLE
                </p>
                <button
                  className=" zoom-in"
                  onClick={() => setIsWinsChart(true)}
                >

                  <img src={"/images/info.png"} className="w-12 h-12" alt="" />
                </button>
              </div>
              <div className="absolute right-0 z-30 -mr-8 -top-20 max-sm:-top-14 flex-col items-center">
                <p className={`text-sm text-white max-sm:hidden`}>
                  RACE LEADERS
                </p>
                <div className="flex justify-center">
                  <button
                    className="zoom-in"
                    onClick={handleOpenLeaderboard}
                  >

                    <img src={"/images/ranking.png"} className="w-12 h-12" alt="" />
                  </button>
                </div>

              </div>
              <div className="absolute hue-rotate -top-11 right-64 z-50 max-lg:right-40 max-md:right-36 max-md:-top-7 max-sm:right-20">
                <img
                  src={"/images/title.png"}
                  className="relative h-[40px] max-md:h-[20px]"
                  alt=""
                />
              </div>
              <TokenDropdown />
              <CoinValue
                title="Coin value"
                coinValue={coinValue}
                className="absolute right-[80px] w-[200px] z-30 -bottom-11 max-lg:right-[40px] max-lg:-bottom-6 max-md:right-0 max-md:-bottom-0 max-md:w-[150px] max-sm:right-0 max-sm:-bottom-8 max-sm:w-[130px]"
                setCoinValue={setCoinValue}
              />

              <button
                title="Spin"
                className={`grid w-[100px] h-[100px] mt-5  transition-all duration-300 rounded-full place-content-center hover:scale-[1.1]  disabled:cursor-not-allowed absolute left-1/2 z-30 -bottom-[60px] -translate-x-1/2 max-lg:-bottom-[35px] max-lg:w-[80px] max-lg:h-[80px] max-md:-bottom-[5px] max-md:w-[60px] max-md:h-[60px] max-md:left-[240px] max-sm:-bottom-[37px] max-sm:w-[40px] max-sm:h-[40px] max-sm:left-[165px] max-[400px]:left-[150px] ${token === "snek" ? "bg-gray-500 hover:bg-gray-600 " : "bg-yellow-500  hover:bg-yellow-600 "}`}
                onClick={handleSpin}
                disabled={
                  !isSpinMoveEnd ||
                  !connected ||
                  (token === "ada" && gameBalance.ada < 3) ||
                  (token === "dum" && gameBalance.dum <= 100) ||
                  (token === "nebula" && gameBalance.nebula <= 5000)
                  || (token === "konda" && gameBalance.konda <= 10000) || (token === "snek" && gameBalance.snek <= 5000)
                }
              >
                {token === "snek" ? (
                  <img src="/images/snek-spin.png" className="relative" alt="" />
                ) : (<img src="/images/spin.png" className="relative" alt="" />)}
                <p className={`absolute text-3xl  font-semibold top-8 right-3 max-lg:text-2xl max-lg:top-6 max-lg:right-2 max-md:text-lg max-md:top-4 max-md:right-2 max-sm:hidden ${token === "snek" ? "text-white" : "text-black"}`}>
                  SPIN
                </p>
              </button>
              <div className="flex gap-1 h-[460px] w-[800px] cell-border relative z-10 max-lg:w-[600px] max-lg:h-[400px] max-md:w-[475px] max-md:h-[350px] max-sm:w-[330px] max-sm:h-[270px] max-[400px]:w-[300px] max-[400px]:h-[250px]">
                {cells.map((item, key) => (
                  <SlotCell
                    key={key}
                    targetIndex={8}
                    y={positionY}
                    delay={0.6 * (key + 1)}
                    blur={blur}
                    symbols={item}
                    isReset={isReset}
                    isSpinMoveEnd={isSpinMoveEnd}
                  />
                ))}
              </div>
            </div>
            <div className="w-full flex justify-between max-lg:pl-2">
              <p className="relative text-xl text-white font-semibold top-16 -right-32 max-lg:text-lg max-lg:top-12 max-lg:-right-24 max-md:text-md max-md:top-3 max-md:-right-20 max-sm:text-sm max-sm:top-10 max-sm:-right-8 max-[400px]:hidden">
                TOKEN
              </p>
              <p className="relative text-xl text-white font-semibold top-16 right-40 max-lg:text-lg max-lg:top-12 max-lg:right-32  max-md:text-md max-md:top-3 max-md:right-14 max-sm:text-sm max-sm:top-10 max-sm:right-11 max-[400px]:hidden">
                BET
              </p>
            </div>

            <div className="w-[80%] mx-auto  rounded-lg px-10 py-2 flex justify-between items-center relative top-20 cell-border hue-rotate">
              <span className="border-span" />
              <span className="border-span" />
              <span className="border-span" />
              <span className="border-span" />
              <p className="text-md text-white cursor-pointer" onClick={handleSetMin}>MIN</p>
              <p className="text-md text-white cursor-pointer" onClick={handleSetHalf}>1/2</p>
              <p className="text-md text-white cursor-pointer" onClick={handleSetDouble}>2X</p>
              <p className="text-md text-white cursor-pointer" onClick={handleSetMax}>MAX</p>

            </div>
            <div className="relative top-20 flex items-center">
              
              <button
                className="absolute -left-5 z-100 -top-14 max-sm:-top-10 "
                onClick={() => setIsGameFee(true)}
              >
                <p className="text-sm text-white -ml-4 max-sm:hidden ">SPIN FEE</p>
                <img src={"/images/fee.png"} className="w-8 h-8" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <WinsChart isOpen={isWinsChart} onClose={() => setIsWinsChart(false)} token={token} />
      <WinPopup
        isOpen={isWinModal}
        onClose={() => setIsWinModal(false)}
        onReset={onReset}
        multiplier={gameResult.multiplier}
        getAmount={gameResult.getAmount}
        token={token}
      />
      <GameFee isOpen={isGameFee} onClose={() => setIsGameFee(false)} />
      <LeaderBoard isOpen={isLeaderboard} rankingData={lbData} onClose={() => setIsLeaderboard(false)} />
    </>
  );
};

export default SlotsContainer;

