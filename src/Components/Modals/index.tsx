import Add from './Add.tsx';
import Remove from './Remove.tsx';
import Rename from './Rename.tsx';

interface IModals {
  addChannel: () => JSX.Element;
  removeChannel: () => JSX.Element;
  renameChannel: () => JSX.Element;
}

const modals: IModals = {
  addChannel: Add,
  removeChannel: Remove,
  renameChannel: Rename,
};

const getModal = (type: keyof IModals) => modals[type];

const getModalComponent = (type: keyof IModals | null) => {
  if (type === null) return null;
  const ModalComponent = getModal(type);
  return <ModalComponent />;
};

export default getModalComponent;
