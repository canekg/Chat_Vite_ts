import { useState, useCallback, useMemo, PropsWithChildren } from 'react';
import axios from 'axios';
import routes from '../routes.ts';
import { AuthContext } from './AuthContext.ts';
import { IUser, IAxiosHeaders } from '../types/сontext.ts';
import { IDataChannels } from '../types/state.ts';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const currentUser: IUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentHeader: IAxiosHeaders = JSON.parse(localStorage.getItem('header') || '{}');
  const [user, setUser] = useState<IUser | null>(currentUser);
  const [header, setHeader] = useState<IAxiosHeaders>(currentHeader);

  const logIn = useCallback(async (username: string, password: string) => {
    const { data } = await axios.post<IUser>(routes.loginPath(), {
      username,
      password,
    });
    setUser(data);
    const { token } = data;
    const newHeader = { Authorization: `Bearer ${token}` } as IAxiosHeaders;
    setHeader(newHeader);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('header', JSON.stringify(newHeader));
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('header');
  }, []);

  const getDataChannels = useCallback(async (): Promise<IDataChannels> => {
    const { data } = await axios.get<IDataChannels>(routes.dataPath(), {
      headers: header,
    });
    return data;
  }, [header]);

  const context = useMemo(
    () => ({
      logIn,
      user,
      header,
      logOut,
      getDataChannels,
    }),
    [logIn, user, header, logOut, getDataChannels]
  );
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
