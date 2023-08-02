import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { GameProvider } from "../context/GameProvider";
import { UserProvider } from "../context/UserProvider";
import { ModalProvider } from "../context/ModalProvider";
import FundModal from "../components/FundModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MeshProvider>
        <GameProvider>
          <UserProvider>
            <ModalProvider>
              <Component {...pageProps} />
              <FundModal />
              <ToastContainer
                style={{ fontSize: 15 }}
                pauseOnFocusLoss={false}
                enableMultiContainer={false}
              />
            </ModalProvider>
          </UserProvider>
        </GameProvider>
      </MeshProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
