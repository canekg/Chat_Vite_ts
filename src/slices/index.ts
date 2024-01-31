import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.ts';
import messagesReducer from './messagesSlice.ts';
import modalSlice from './modalSlice.ts';

const store = configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
