import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { close } from '../../slices/modalSlice.ts';
import { useSocket } from '../../context/SocketContext.ts';
import { useFilter } from '../../context/FilterContext.ts';
import {
  getchannalIdModal,
  getExistingChannels,
  getOldNameChannel,
} from '../../selectors/index.ts';
import { AppDispatch } from '../../slices/index.ts';

const Rename = () => {
  const filterWords = useFilter();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocket();
  const rollbar = useRollbar();
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const channalId = useSelector(getchannalIdModal);
  const existingChannels = useSelector(getExistingChannels);
  const oldNameChannel = useSelector(getOldNameChannel);

  const formik = useFormik({
    initialValues: { name: oldNameChannel },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required(t('validation.emptyField'))
        .min(3, t('validation.minMaxsimSymbols'))
        .max(20, t('validation.minMaxsimSymbols'))
        .test(
          'is-unique',
          t('validation.uniqueness'),
          (value) => !existingChannels.includes(value)
        ),
    }),
    onSubmit: async ({ name }) => {
      const filteredRename = filterWords(name);
      try {
        await socket.renameChannel(channalId, filteredRename);
        toast.success(t('notifications.renameChannel'));
        dispatch(close());
      } catch (error) {
        toast.error(t('notifications.errorRenameChannel'));
        if (typeof error === 'string') {
          rollbar.error('RenameChannel', error);
        }
      }
    },
  });

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  return (
    <Modal show centered onHide={() => dispatch(close())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type='text'
              ref={inputRef}
              id='name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              disabled={formik.isSubmitting}
              name='name'
              isInvalid={!!formik.errors.name}
            />
            <Form.Label htmlFor='name' visuallyHidden>
              {t('modal.channelName')}
            </Form.Label>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => dispatch(close())}>
              {t('modal.send')}
            </Button>
            <Button
              type='submit'
              variant='primary'
              disabled={formik.isSubmitting}
            >
              {t('modal.cancel')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
