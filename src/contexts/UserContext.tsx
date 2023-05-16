import React, { createContext, useState, useEffect, useContext } from "react";
import { User } from "../utils/models";
import { validateLogin } from "../utils/api";

const UserContext = createContext<
  [User | undefined, (user: User | undefined) => void, boolean]
>([undefined, () => {}, false]);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    (async () => {
      const userData = await validateLogin();
      setUser(userData);
      setInitializing(false);
    })();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser, initializing]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
