import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Channels from '../chat/Channels';
import Messages from '../chat/Messages';
import { useAuth } from '../../context/AuthProvider';
import getDataChannels from '../../api/getDataChannels';
import getModalComponent from '../Modals/index';
import { getTypeModal } from '../../selectors/index.js';

const MainPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const { header } = auth;
  const type = useSelector(getTypeModal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getDataChannels(dispatch, header));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error(t('notifications.notАuthorized'));
          auth.logOut();
        } else {
          toast.error(t('notifications.another'));
        }
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
        { getModalComponent(type) }
      </div>
    </div>
  );
};
export default MainPage;
