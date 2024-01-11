import { createContext, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  
  const userContextValue = {
    userId: null,
    setUserId: () => {},
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};
