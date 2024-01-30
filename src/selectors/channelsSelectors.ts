import { createSelector } from '@reduxjs/toolkit';
import { IState } from '../types/state.ts';

const getChannelsInfo = (state: IState) => state.channelsInfo;
const getChannels = (state: IState) => getChannelsInfo(state).channels;
const getChannelId = (state: IState) => state.modal.extra?.channalId;

const getExistingChannels = createSelector(
  [getChannels],
  (channels) => channels.map((channel) => channel.name),
);

const getOldNameChannel = createSelector(
  [getChannels, getChannelId],
  (channels, channelId) => channels.find((channel) => channel.id === channelId)?.name || '',
);

export { getChannelsInfo, getExistingChannels, getOldNameChannel };
