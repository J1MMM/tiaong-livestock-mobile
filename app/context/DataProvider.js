import React, { createContext, useState } from "react";
import { USER_INITIAL_DATA } from "../utils/constant";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(USER_INITIAL_DATA);

  return (
    <DataContext.Provider value={{ userData, setUserData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
