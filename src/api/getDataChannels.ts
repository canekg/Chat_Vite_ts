import axios from 'axios';
import routes from '../routes.ts';
import { setChannelsInitialState } from '../slices/channelsSlice.js';
import { setMessagesInitialState } from '../slices/messagesSlice.js';

// interface IHeader {
//   Authorization: string;
// }

const getDataChannels = (dispatch, header) => async () => {
  const { data } = await axios.get(routes.dataPath(), {
    headers: header,
  });
  dispatch(setChannelsInitialState(data));
  dispatch(setMessagesInitialState(data));
};

export default getDataChannels;
