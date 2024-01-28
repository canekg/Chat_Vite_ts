import { createSelector } from '@reduxjs/toolkit';

const getChannelsInfo = (state) => state.channelsInfo;
const getChannels = (state) => getChannelsInfo(state).channels;
const getChannelId = (state) => state.modal.extra.channalId;

const getExistingChannels = createSelector(
  [getChannels],
  (channels) => channels.map((channel) => channel.name),
);

const getOldNameChannel = createSelector(
  [getChannels, getChannelId],
  (channels, channelId) => channels.find((channel) => channel.id === channelId)?.name || '',
);

export { getChannelsInfo, getExistingChannels, getOldNameChannel };
