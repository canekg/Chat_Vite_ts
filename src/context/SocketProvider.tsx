import { useMemo, useCallback, PropsWithChildren } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import store from '../slices/index.ts';
import { addMessages } from '../slices/messagesSlice.ts';
import {
  addChannel,
  removeChanneFromState,
  renameChannelFromState,
} from '../slices/channelsSlice.ts';
import { SocketContext } from './SocketContext.ts';
import { IСhannels, IMessages } from '../types/state.ts';
import { ISocketContext, INewChannelResponse } from '../types/сontext.ts';

const SocketProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const socket = io();

  socket.on('newMessage', (payload: IMessages) => store.dispatch(addMessages(payload)));
  socket.on('newChannel', (payload: IСhannels) => store.dispatch(addChannel(payload)));
  socket.on('removeChannel', (payload: { id: number}) =>
    store.dispatch(removeChanneFromState(payload))
  );
  socket.on('renameChannel', (payload: IСhannels) =>
    store.dispatch(renameChannelFromState(payload))
  );

  const newMessage = useCallback(
    async (messageData: IMessages): Promise<void> => {
      socket.emit('newMessage', messageData, (response: {status: string}) => {
        if (response.status !== 'ok') {
          toast.error(t('notifications.errMessage'));
        }
      });
    },
    [socket, t]
  );

  const newChannel = useCallback(
    (newNameChannel: { name: string; }): Promise<IСhannels> =>
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
    (channelId: number | undefined): void => {
      socket.emit('removeChannel', { id: channelId });
    },
    [socket]
  );

  const renameChannel = useCallback(
    (channelId: number | undefined, newNameChannel: string): void => {
      socket.emit('renameChannel', { id: channelId, name: newNameChannel });
    },
    [socket]
  );

  const context: ISocketContext = useMemo(
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
