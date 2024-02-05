/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IChannelsInfo, IDataChannels, IСhannels } from '../types/state.ts';

const initialState: IChannelsInfo = {
  channels: [],
  currentChannelId: null,
};
const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    setChannelsInitialState(
      state: IChannelsInfo,
      action: PayloadAction<IDataChannels>
    ) {
      state.channels = [...action.payload.channels];
      state.currentChannelId = action.payload.currentChannelId;
    },
    setCurrentChannel(state: IChannelsInfo, action: PayloadAction<number>) {
      state.currentChannelId = action.payload;
    },
    addChannel(state: IChannelsInfo, action: PayloadAction<IСhannels>) {
      state.channels.push(action.payload);
    },
    removeChanneFromState(state: IChannelsInfo, action: PayloadAction<{ id: number }>) {
      if (state.currentChannelId === action.payload.id)
        state.currentChannelId = defaultChannelId;
      state.channels = state.channels.filter(
        (channel) => channel.id !== action.payload.id
      );
    },
    renameChannelFromState(state: IChannelsInfo, action: PayloadAction<IСhannels>) {
      state.channels = state.channels.map((channel) => {
        if (channel.id === action.payload.id) {
          return {
            ...channel,
            name: action.payload.name,
          };
        }
        return channel;
      });
    },
  },
});

export const {
  setChannelsInitialState,
  setCurrentChannel,
  addChannel,
  removeChanneFromState,
  renameChannelFromState,
} = channelsSlice.actions;
export default channelsSlice.reducer;
