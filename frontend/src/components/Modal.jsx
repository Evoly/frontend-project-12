import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const messages = {
    removeChannel: {
      loading: t('channel.removeChannelPending'),
      success: t('channel.removeChannelFulfilled'),
      error: t('channel.removeChannelRejected')
  },
    addChannel: {
      loading: t('channel.addChannelPending'),
      success: t('channel.addChannelFulfilled'),
      error: t('channel.addChannelRejected')
    }, 
    renameChannel: {
      loading: t('channel.renameChannelPending'),
      success: t('channel.renameChannelFulfilled'),
      error: t('channel.renameChannelRejected')
    },
  }

  const handleSubmit = async (val) => {
    const data = {...val, id};
    const toastId = toast.loading(messages[type].loading);
    try {
      await dispatch(actions[type](data)).unwrap();
      toast.update(toastId, {
        render: messages[type].success,
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: messages[type].error,
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }    
    dispatch(setClose())
  };

  const handleClose = () => dispatch(setClose())

  const CurrentModal = types[type];

  return (type && <CurrentModal id={id} show={show} handleSubmit={handleSubmit} handleClose= {handleClose} channels = {channels} type={type}/>);
}

export default MyModal;