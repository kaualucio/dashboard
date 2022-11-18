import { destroyCookie, parseCookies } from 'nookies';
import React, {
  useEffect,
  PropsWithChildren,
  createContext,
  useState,
  useContext,
} from 'react';

import jwt_decode from 'jwt-decode';

import { UserType } from '../@types/User';
import { api } from '../service/api/api';
import { useRouter } from 'next/router';

interface AuthContextProps {
  user: UserType | null;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const { 'beru.access_token': access_token } = parseCookies();
  useEffect(() => {
    if (access_token) {
      const { uid: userId }: any = jwt_decode(access_token);
      api.get(`/api/me/${userId}`).then((res) => {

        setUser(res.data);
      });
    }
  }, [access_token]);
  
  function handleLogout() {
    destroyCookie(null, 'beru.refresh_token');
    destroyCookie(null, 'beru.access_token');
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return { user, handleLogout };
};

export { AuthContextProvider, useAuth };
