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
import { useFetch } from '../hooks/useFetch';
import { useRouter } from 'next/router';
interface AuthContextProps {
  user: UserType | null;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType | null>(null);
  const { 'beru.session_token': session_token } = parseCookies();
  const router = useRouter();
  useEffect(() => {
    if (session_token) {
      const { uid: userId }: any = jwt_decode(session_token);
      api.get(`/api/me/${userId}`).then((res) => {
        setUser(res.data);
      });
    }
  }, [session_token]);
  function handleLogout() {
    destroyCookie(null, 'beru.refresh_token');
    destroyCookie(null, 'beru.access_token');
    destroyCookie(null, 'beru.session_token');
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
