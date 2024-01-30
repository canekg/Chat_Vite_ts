import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelsList from './ChannelsList';
import ChannelIcon from '../icons/ChannelIcon.jsx';
import { setCurrentChannel } from '../../slices/channelsSlice';
import { open } from '../../slices/modalSlice.ts';
import { getChannelsInfo } from '../../selectors/index.js';

const Channels = () => {
  const channelsListRef = useRef(null);
  const addButtonRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector(getChannelsInfo);

  const handleChannelClick = (id) => dispatch(setCurrentChannel(id));
  const handleAddChannel = () => dispatch(open({ type: 'addChannel' }));
  const handleRemoveChannel = (id) =>
    dispatch(open({ type: 'removeChannel', extra: { channalId: id } }));
  const handleRenameChannel = (id) =>
    dispatch(open({ type: 'renameChannel', extra: { channalId: id } }));

  return (
    <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>{t('channels')}</b>
        <button
          ref={addButtonRef}
          type='button'
          className='p-0 text-primary btn btn-group-vertical'
          onClick={handleAddChannel}
        >
          <ChannelIcon />
          <span className='visually-hidden'>+</span>
        </button>
      </div>
      <ul
        ref={channelsListRef}
        id='channels-box'
        className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
      >
        <ChannelsList
          channels={channels}
          currentChannelId={currentChannelId}
          handleChannelClick={handleChannelClick}
          handleRemoveChannel={handleRemoveChannel}
          handleRenameChannel={handleRenameChannel}
        />
      </ul>
    </div>
  );
};

export default Channels;
