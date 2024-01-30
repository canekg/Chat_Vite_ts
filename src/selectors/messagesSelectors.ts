/* eslint-disable max-len */
import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../types/state.ts';

const getMessagesInfo = (state: IState) => state.messagesInfo.messages;
const getCurrentChannelId = (state: IState) => state.channelsInfo.currentChannelId;

const getCurrentMessages = createSelector(
  [getMessagesInfo, getCurrentChannelId],
  (messages, currentChannelId) => messages.filter((message) => message.channelId === currentChannelId),
);

export default getCurrentMessages;
