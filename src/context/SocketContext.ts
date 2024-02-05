import { createContext, useContext } from 'react';
import { IСhannels, IMessages } from '../types/state.ts';

interface SocketContext {
  newMessage: (messageData: IMessages) => Promise<void>;
  newChannel: (newNameChannel: { name: string; }) => Promise<IСhannels>;
  removeChannel: (channelId: number | undefined) => void;
  renameChannel: (channelId: number | undefined, newNameChannel: string) => void;
}

const SocketContext = createContext({} as SocketContext);
const useSocket = () => useContext(SocketContext);

export { SocketContext, useSocket };