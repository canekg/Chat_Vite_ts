import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Channels from '../chat/Channels.jsx';
import Messages from '../chat/Messages.tsx';
import { useAuth } from '../../context/AuthContext.ts';
import getModalComponent from '../Modals/index.tsx';
import { getTypeModal } from '../../selectors/index.ts';
import type { AppDispatch } from '../../slices/index.ts';
import { setChannelsInitialState } from '../../slices/channelsSlice.ts';
import { setMessagesInitialState } from '../../slices/messagesSlice.ts';
import { AxiosError } from 'axios';

const MainPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const type = useSelector(getTypeModal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await auth.getDataChannels();
        dispatch(setChannelsInitialState(data));
        dispatch(setMessagesInitialState(data));
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 401) {
            toast.error(t('notifications.notАuthorized'));
            auth.logOut();
          } else {
            toast.error(t('notifications.another'));
          }
        }
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className='container h-100 my-4 overflow-hidden rounded shadow'>
      <div className='row h-100 bg-white flex-md-row'>
        <Channels />
        <Messages />
        {getModalComponent(type)}
      </div>
    </div>
  );
};
export default MainPage;
