import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import NewMessegeForm from './NewMessegeForm';
import { useAuth } from '../../context/AuthProvider';
import { getChannelsInfo, getCurrentMessages } from '../../selectors/index.js';

const Messages = () => {
  const messagesRef = useRef(null);
  const { channels, currentChannelId } = useSelector(getChannelsInfo);
  const currentChannel = channels.filter((channel) => currentChannelId === channel.id)[0];
  const currentName = currentChannel ? currentChannel.name : '';
  const { t } = useTranslation();
  const currentMesseges = useSelector(getCurrentMessages);
  const auth = useAuth();
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [currentMesseges]);

  const listMessages = currentMesseges.map((message) => (
    <div
      className={message.username === auth.user.username ? 'text-break mb-2 bg-light' : 'text-break mb-2'}
      key={message.id}
    >
      <b>
        {message.username}
      </b>
      {`: ${message.body}`}
    </div>
  ));

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentName}`}</b>
          </p>
          <span className="text-muted">{t('messagesCounter.messages', { count: currentMesseges.length })}</span>
        </div>
        <div id="messages-box" ref={messagesRef} className="chat-messages overflow-auto px-5 ">
          {listMessages}
        </div>
        <NewMessegeForm />
      </div>
    </div>
  );
};

export default Messages;
