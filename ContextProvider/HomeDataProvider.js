import React, {createContext, useState} from 'react';

export const HomeDataContext = createContext();

export const AuthProvider = ({children}) => {
  const [lastData, setLastData] = useState({});
  return (
    <HomeDataContext.Provider
      value={{
        lastData,
        setLastData,
      }}>
      {children}
    </HomeDataContext.Provider>
  );
};
