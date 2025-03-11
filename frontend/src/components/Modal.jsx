import { useDispatch, useSelector } from 'react-redux';

import ModalConfirm from './ModalConfirm';
import ModalSendData from './ModalSendData';

import { removeChannel, addChannel, renameChannel } from '../slices/channelsSlice';
import { setClose } from '../slices/modalSlice';

const types = {
  removeChannel: ModalConfirm,
  addChannel: ModalSendData,
  renameChannel: ModalSendData,
};

const actions = {
  removeChannel: removeChannel,
  addChannel: addChannel,
  renameChannel: renameChannel,
};

const MyModal = () => {
  const { type, show, id } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channels)
  
  const dispatch = useDispatch();

  const title = 'test';

  const handleSubmit = (val) => {
    const data = {...val, id};
    
    dispatch(actions[type](data));
    dispatch(setClose())
  };

  const handleClose = () => dispatch(setClose())

  const CurrentModal = types[type];

  return (type && <CurrentModal id={id} show={show} handleSubmit={handleSubmit} handleClose= {handleClose} title={title} channels = {channels} />);
}

export default MyModal;