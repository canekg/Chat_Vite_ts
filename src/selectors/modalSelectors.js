const getIsOpenedModal = (state) => state.modal.isOpened;

const getTypeModal = (state) => state.modal.type;

const getchannalIdModal = (state) => state.modal.extra.channalId;

export { getIsOpenedModal, getTypeModal, getchannalIdModal };
