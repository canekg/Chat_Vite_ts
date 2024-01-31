/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IChannelsInfo } from '../types/state.ts';

const initialState: IChannelsInfo = {
  channels: [],
  currentChannelId: null,
};
const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    setChannelsInitialState(state: IChannelsInfo, { payload }) {
      state.channels = [...payload.channels];
      state.currentChannelId = payload.currentChannelId;
    },
    setCurrentChannel(state: IChannelsInfo, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state: IChannelsInfo, { payload }) {
      state.channels.push(payload);
    },
    removeChanneFromState(state: IChannelsInfo, { payload }) {
      if (state.currentChannelId === payload.id) state.currentChannelId = defaultChannelId;
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
    },
    renameChannelFromState(state: IChannelsInfo, { payload }) {
      state.channels = state.channels.map((channel) => {
        if (channel.id === payload.id) {
          return {
            ...channel,
            name: payload.name,
          };
        }
        return channel;
      });
    },
  },
});

export const {
  setChannelsInitialState,
  setCurrentChannel, addChannel, removeChanneFromState, renameChannelFromState,
} = channelsSlice.actions;
export default channelsSlice.reducer;
