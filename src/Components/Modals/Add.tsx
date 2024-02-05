/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { close } from '../../slices/modalSlice.ts';
import { useSocket } from '../../context/SocketContext.ts';
import { useFilter } from '../../context/FilterContext.ts';
import {
  getExistingChannels,
  getIsOpenedModal,
} from '../../selectors/index.ts';
import { setCurrentChannel } from '../../slices/channelsSlice.ts';
import { AppDispatch } from '../../slices/index.ts';

const Add = () => {
  const filterWords = useFilter();
  const { t } = useTranslation();
  const socket = useSocket();
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const existingChannels = useSelector(getExistingChannels);
  const dispatch = useDispatch<AppDispatch>();
  const isOpened = useSelector(getIsOpenedModal);
  const rollbar = useRollbar();
  const hendleClose = () => dispatch(close());

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: { name: '' },

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
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ name }, { resetForm }) => {
      const filteredNameChannel: string = filterWords(name);
      const newChannel = {
        name: filteredNameChannel,
      };
      try {
        const channel = await socket.newChannel(newChannel);
        dispatch(setCurrentChannel(channel.id));
        toast.success(t('notifications.addChannel'));
        resetForm();
      } catch (error) {
        toast.error(t('notifications.errorAddChannel'));
        if (typeof error ==='string') {
          rollbar.error('AddChannel', error);
        }
      } finally {
        hendleClose();
      }
    },
  });

  return (
    <Modal show={isOpened} centered>
      <Modal.Header closeButton onHide={hendleClose}>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              data-testid='input-name'
              name='name'
              isInvalid={!!(formik.touched.name && formik.errors.name)}
            />
            <Form.Label visuallyHidden>{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback type='invalid'>
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant='secondary' onClick={hendleClose}>
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
export default Add;
