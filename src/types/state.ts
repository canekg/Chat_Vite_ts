export interface IExtra {
  channalId: number;
}

export interface IModals {
  addChannel: () => JSX.Element;
  removeChannel: () => JSX.Element;
  renameChannel: () => JSX.Element;
}

export interface IModal {
  extra: IExtra | null;
  isOpened: boolean;
  type: keyof IModals | null;
}

export interface IСhannels {
  id: number;
  name: string;
  removable: boolean;
}

export interface IChannelsInfo {
  channels: IСhannels[];
  currentChannelId: number | null;
}

export interface IMessages {
  channelId: number | undefined;
  body: string;
  username: string;
  id?: number;
}

export interface IMessagesInfo {
  messages: IMessages[];
}

export interface IState {
  channelsInfo: IChannelsInfo;
  messagesInfo: IMessagesInfo;
  modal: IModal;
}

export interface IDataChannels extends IChannelsInfo {
  messages: IMessages[];
}
