import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { close } from '../../slices/modalSlice';
import { useSocket } from '../../context/SocketProvider.jsx';
import { getchannalIdModal, getIsOpenedModal } from '../../selectors/index.js';

const Remove = () => {
  const { t } = useTranslation();
  // const rollbar = useRollbar();
  const dispatch = useDispatch();
  const isOpened = useSelector(getIsOpenedModal);
  const channalId = useSelector(getchannalIdModal);
  const socket = useSocket();
  const hendleClose = () => dispatch(close());
  const handleRemove = async () => {
    try {
      socket.removeChannel(channalId);
      toast.success(t('notifications.removeChannel'));
      dispatch(close());
    } catch (error) {
      toast.error(t('notifications.errorRemoveChannel'));
      // rollbar.error('RemoveChannel', error);
    }
  };

  return (
    <Modal show={isOpened} centered>
      <Modal.Header closeButton onHide={hendleClose}>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.confirmSure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="danger" onClick={handleRemove}>{t('modal.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Remove;
