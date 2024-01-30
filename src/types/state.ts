interface IExtra {
  channalId: number;
}

export interface IModal {
  extra: IExtra | null;
  isOpened: boolean;
  type: string | null;
}

interface IСhannels {
  id: number;
  name: string;
  removable: boolean;
}

interface IChannelsInfo {
  channels: IСhannels[];
  currentChannelId: number;
}

interface IMessages {
  channelId: number;
  body: string;
  username: string;
  id: number;
}

interface IMessagesInfo {
  messages: IMessages[];
}

export interface IState {
  channelsInfo: IChannelsInfo;
  messagesInfo: IMessagesInfo;
  modal: IModal;
}
