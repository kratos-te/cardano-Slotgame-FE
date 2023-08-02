import Head from "next/head";
import { MeshBadge } from "@meshsdk/react";
import BgImage from "../assets/images/space.jpg";
import SlotsContainer from "../components/SlotsContainer";
import Header from "../components/Header";
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Image
        src={BgImage}
        className="absolute object-cover w-full h-full"
        alt=""
      />
      <Header title="Space Race" />
      <SlotsContainer />
    </main>
  );
}
