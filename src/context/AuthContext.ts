import { createContext, useContext } from 'react';
import { IAuthContext } from '../types/сontext.ts';

const AuthContext = createContext({} as IAuthContext);
const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth };
