import React, { createContext, useContext, useState } from "react";
import MockData from "../staticData/data";
const AppContext = createContext({});

export const useCTX = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [ctxObj, setCtxObj] = useState({
    font: {
      normal: "Inter",
      bold: "InterBold",
    },
    theme: {
      primary: "#000000",
      secondary: "#666666",
      tertiary: "#F2F2F2",
      paragraph: "#222222",
      placeholder: "#999999",
      iconPrimary: "#BFBFBF",
      iconSeconadry: "#999999",
      bgInfo: "#444444",
      iconWarningLight:"#FBBF24",
    },
  });

  const [data, setData] = useState(MockData);
  return (
    <AppContext.Provider value={{ ctxObj, data }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
