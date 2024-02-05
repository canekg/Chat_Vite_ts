/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IModal, IExtra, IModals } from '../types/state.ts';

const initialState: IModal = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state: IModal, action: PayloadAction<{type: keyof IModals | null; extra?: IExtra}>) => {
      state.type = action.payload.type;
      state.isOpened = true;
      state.extra = action.payload.extra || null;
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
