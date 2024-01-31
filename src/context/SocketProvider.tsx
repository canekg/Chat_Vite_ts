import React, { createContext, useMemo, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import io, { Socket } from 'socket.io-client';
import store from '../slices/index.ts';
import { addMessages } from '../slices/messagesSlice.ts';
import {
  addChannel,
  removeChanneFromState,
  renameChannelFromState,
} from '../slices/channelsSlice.ts';
import { IСhannels, IMessages } from '../types/state.ts';

interface SocketProviderProps {
  socket: Socket,
  children: React.ReactNode
}

interface SocketContext {
  newMessage: (messageData: IMessageData) => Promise<void>;
  newChannel: (newNameChannel: string) => Promise<IData>;
  removeChannel: (channelId: number) => void;
  renameChannel: (channelId: number, newNameChannel: string) => void;
}

export interface IMessageData {
  channelId: number;
  body: string;
  username: string;
}

interface IData {
  channelId: number;
  body: string;
  username: string;
}

export interface INewChannelResponse {
  data: IData;
  status: string;
}

const SocketContext = createContext({} as SocketContext);
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: SocketProviderProps) => {
  const { t } = useTranslation();
  const socket = io();

  socket.on('newMessage', (payload: IMessages) => store.dispatch(addMessages(payload)));
  socket.on('newChannel', (payload: IСhannels) => store.dispatch(addChannel(payload)));
  socket.on('removeChannel', (payload: { id: number}) =>
    store.dispatch(removeChanneFromState(payload))
  );
  socket.on('renameChannel', (payload: IMessages) =>
    store.dispatch(renameChannelFromState(payload))
  );

  const newMessage = useCallback(
    async (messageData: IMessageData): Promise<void> => {
      socket.emit('newMessage', messageData, (response: {status: string}) => {
        if (response.status !== 'ok') {
          toast.error(t('notifications.errMessage'));
        }
      });
    },
    [socket, t]
  );

  const newChannel = useCallback(
    (newNameChannel: string): Promise<IData> =>
      new Promise((resolve) => {
        socket.emit('newChannel', newNameChannel, (response: INewChannelResponse) => {
          if (response.status === 'ok') {
            resolve(response.data);
          }
        });
      }),
    [socket]
  );

  const removeChannel = useCallback(
    (channelId: number): void => {
      socket.emit('removeChannel', { id: channelId });
    },
    [socket]
  );

  const renameChannel = useCallback(
    (channelId: number, newNameChannel: string): void => {
      socket.emit('renameChannel', { id: channelId, name: newNameChannel });
    },
    [socket]
  );

  const context: SocketContext = useMemo(
    () => ({
      newMessage,
      newChannel,
      removeChannel,
      renameChannel,
    }),
    [newMessage, newChannel, removeChannel, renameChannel]
  );

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
