import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext<
  | {
      userEmail: string | null;
      setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
      isLoggedIn: boolean;
      setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
      userRole: string[];
      setUserRole: React.Dispatch<React.SetStateAction<string[]>>;
      logIn(email: string | null, role: string[]): void;
      logOut(): void;
    }
  | undefined
>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const sub = decodedToken.sub;
      const authorities = decodedToken.authorities;
      const roleArray = authorities.map((authority: { authority: string }) => authority.authority);

      if (typeof sub === 'string') {
        logIn(sub, roleArray);
      } else {
        console.log('Email is undefined');
      }
    }
  }, []);

  const logIn = (email: string, role: string[]) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const logOut = () => {
    setUserEmail(null);
    setIsLoggedIn(false);
    setUserRole([]);
    localStorage.removeItem('token');
  };

  const value = {
    userEmail,
    setUserEmail,
    isLoggedIn,
    setIsLoggedIn,
    userRole,
    setUserRole,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
