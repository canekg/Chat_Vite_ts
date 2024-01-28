import React, {
  createContext, useState, useCallback, useMemo, useContext,
} from 'react';
import axios from 'axios';
import routes from '../routes';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

// interface IChildren {
//   children: React.ReactNode;
// }

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentHeader = JSON.parse(localStorage.getItem('header'));
  const [user, setUser] = useState(currentUser);
  const [header, setHeader] = useState(currentHeader);

  const logIn = useCallback(async (username, password) => {
    const { data } = await axios.post(routes.loginPath(), {
      username,
      password,
    });
    setUser(data);
    const { token } = data;
    const newHeader = token ? { Authorization: `Bearer ${token}` } : {};
    setHeader(newHeader);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('header', JSON.stringify(newHeader));
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('header');
  }, []);

  const context = useMemo(() => ({
    logIn, user, header, logOut,
  }), [logIn, user, header, logOut]);
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
