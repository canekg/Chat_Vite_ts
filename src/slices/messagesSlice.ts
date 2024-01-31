/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { removeChanneFromState } from './channelsSlice';
import { IMessagesInfo } from '../types/state.ts';

const initialState: IMessagesInfo = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages(state: IMessagesInfo, { payload }) {
      state.messages.push(payload);
    },
    setMessagesInitialState(state: IMessagesInfo, { payload }) {
      state.messages = [...payload.messages];
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<IMessagesInfo>) => {
    builder.addCase(removeChanneFromState, (state: IMessagesInfo, { payload }) => {
      state.messages = state.messages.filter((message) => message.channelId !== payload.id);
    });
  },
});

export const { addMessages, setMessagesInitialState } = messagesSlice.actions;
export default messagesSlice.reducer;
