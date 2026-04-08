"use client";
import { createContext, useState } from "react";

export const PersentProfileContext = createContext();

export const PersentProfileProvider = ({ children }) => {
  const [numberOfPersent, setnumberOfPersent] = useState(0);

  return (
    <PersentProfileContext.Provider
      value={{
        numberOfPersent,
        setnumberOfPersent,
      }}
    >
      {children}
    </PersentProfileContext.Provider>
  );
};
