import { useContext } from "react"
import Head from "next/head";
import { MeshBadge } from "@meshsdk/react";
import BgImage from "../assets/images/space.jpg";
import SnekImage from "../assets/images/snek-bg.jpg"
import bottomLogo from "../assets/images/bottom-logo.png";
import SlotsContainer from "../components/SlotsContainer";
import Header from "../components/Header";
import { GameContext } from "../context/GameProvider";
import Image from "next/image";

export default function Home() {
  const { token, getGameBalance, gameBalance, wallet } =
    useContext<any>(GameContext);
  return (
    <main className="relative min-h-screen bg-black">
      <Head>
        <title>Space Race</title>
      </Head>
      {token !== "snek" ?
        <Image
          src={BgImage}
          className={`object-cover w-full h-full img-responsive `}
          alt=""
        /> : <Image
          src={SnekImage}
          className={`object-cover w-full h-full img-responsive `}
          alt=""
        />}

      <Header title="Space Race" />
      <SlotsContainer />
    </main>
  );
}
