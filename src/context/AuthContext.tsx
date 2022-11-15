
import { parseCookies } from 'nookies';
import React, {
  useEffect,
  PropsWithChildren,
  createContext,
  useState,
  useContext,
} from 'react';

import jwt_decode from 'jwt-decode';

import { UserType } from '../types/User';
import { DecodedJWT } from '../types/DecodedJWT';
import { api } from '../service/api/api';

interface AuthContextProps {
  user: UserType | null;
}

export const AuthContext = createContext({} as AuthContextProps);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType | null>(null);
  const { access_token } = parseCookies();

  useEffect(() => {
    if (access_token) {
      const { sub: userId }: DecodedJWT = jwt_decode(access_token);
      api.get(`/api/me/${userId}`).then((res) => {
        setUser(res.data);
      });
    }
  }, [access_token]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const { user } = useContext(AuthContext);

  return { user };
};

export { AuthContextProvider, useAuth };
