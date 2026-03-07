"use client";
import { createContext, useState } from "react";

export const NamePageContex = createContext();

export const NamePageProvider = ({ children }) => {
  const [nameOfSideBar, setnameOfSideBar] = useState("");
  const [numberOfSideBar, setnumberOfSideBar] = useState(1);

  return (
    <NamePageContex.Provider
      value={{
        nameOfSideBar,
        setnameOfSideBar,
        numberOfSideBar,
        setnumberOfSideBar,
      }}
    >
      {children}
    </NamePageContex.Provider>
  );
};
