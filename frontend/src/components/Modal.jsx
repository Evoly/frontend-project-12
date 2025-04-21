import { useDispatch, useSelector } from "react-redux";

import ModalRemoveChannel from "./modalComponents/ModalRemoveChannel";
import ModalRenameChannel from "./modalComponents/ModalRenameChannel";
import ModalAddChannel from "./modalComponents/ModalAddChannel";

import { setClose } from "../slices/modalSlice";
const types = {
  removeChannel: ModalRemoveChannel,
  addChannel: ModalAddChannel,
  renameChannel: ModalRenameChannel,
};

const MyModal = ({ changeCurrentChannel }) => {
  const { type, show, id } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channels);

  const dispatch = useDispatch();
  const handleClose = () => dispatch(setClose());

  const CurrentModal = types[type];

  return (
    type && (
      <CurrentModal
        id={id}
        show={show}
        handleClose={handleClose}
        channels={channels}
        changeCurrentChannel={changeCurrentChannel}
      />
    )
  );
};

export default MyModal;
