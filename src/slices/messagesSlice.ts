/* eslint-disable no-param-reassign */
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { removeChanneFromState } from './channelsSlice';
import { IMessagesInfo, IMessages, IDataChannels } from '../types/state.ts';

const initialState: IMessagesInfo = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages(state: IMessagesInfo, action: PayloadAction<IMessages>) {
      state.messages.push(action.payload);
    },
    setMessagesInitialState(
      state: IMessagesInfo,
      action: PayloadAction<IDataChannels>
    ) {
      state.messages = [...action.payload.messages];
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<IMessagesInfo>) => {
    builder.addCase(
      removeChanneFromState,
      (
        state: IMessagesInfo,
        action: PayloadAction<{ id: number }>
      ) => {
        state.messages = state.messages.filter(
          (message) => message.channelId !== action.payload.id
        );
      }
    );
  },
});

export const { addMessages, setMessagesInitialState } = messagesSlice.actions;
export default messagesSlice.reducer;
