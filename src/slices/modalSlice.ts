/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IModal } from '../types/state.ts';

const initialState: IModal = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state: IModal, { payload }) => {
      state.type = payload.type;
      state.isOpened = true;
      state.extra = payload.extra || null;
    },
    close: (state: IModal) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
