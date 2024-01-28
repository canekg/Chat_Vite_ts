/* eslint-disable max-len */
import { createSelector } from '@reduxjs/toolkit';

const getMessagesInfo = (state) => state.messagesInfo.messages;
const getCurrentChannelId = (state) => state.channelsInfo.currentChannelId;

const getCurrentMessages = createSelector(
  [getMessagesInfo, getCurrentChannelId],
  (messages, currentChannelId) => messages.filter((message) => message.channelId === currentChannelId),
);

export default getCurrentMessages;
