import React, { ReactNode, createContext, useState } from "react";

// Define the shape of the context
interface ModalContextProps {
  isFundModal: string;
  setIsFundModal: Function;
}

// Create the Modal context
export const ModalContext = createContext<ModalContextProps | null>(null);

// Create the Modal context provider component
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isFundModal, setIsFundModal] = useState("");
  return (
    <ModalContext.Provider
      value={{
        isFundModal,
        setIsFundModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
