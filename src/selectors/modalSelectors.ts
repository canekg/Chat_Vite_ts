import { IState } from '../types/state.ts';

const getIsOpenedModal = (state: IState) => state.modal.isOpened;

const getTypeModal = (state: IState) => state.modal.type;

const getchannalIdModal = (state: IState) => state.modal.extra?.channalId;

export { getIsOpenedModal, getTypeModal, getchannalIdModal };
