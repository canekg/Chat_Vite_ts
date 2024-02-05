import { AxiosHeaders } from 'axios';
import { IСhannels, IMessages, IDataChannels } from '../types/state.ts';

export interface IUser {
  token: string;
  username: string;
}

export interface IAuthContext {
  logIn: (username: string, password: string) => Promise<void>;
  user: IUser | null;
  header: AxiosHeaders;
  logOut: () => void;
  getDataChannels: () => Promise<IDataChannels>;
}

export interface IAxiosHeaders extends AxiosHeaders {
  Authorization: string
}

export interface ISocketContext {
  newMessage: (messageData: IMessages) => Promise<void>;
  newChannel: (newNameChannel: { name: string; }) => Promise<IСhannels>;
  removeChannel: (channelId: number | undefined) => void;
  renameChannel: (channelId: number | undefined, newNameChannel: string) => void;
}

export interface INewChannelResponse {
  data: IСhannels;
  status: string;
}