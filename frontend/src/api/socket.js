import { io } from 'socket.io-client';

import { addMessage } from '../slices/messagesSlice';

import {
  addChannel,
  removeChannel,
  renameChannel,
} from '../slices/channelsSlice';

const socket = io();

const socketApi = (dispatch) => {
  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  socket.on('renameChannel', (message) => {
    dispatch(renameChannel(message));
  });

  socket.on('newChannel', (message) => {
    dispatch(addChannel(message));
  });

  socket.on('removeChannel', (message) => {
    dispatch(removeChannel(message));
  });

  return () => {
    socket.off('newMessage');
    socket.off('renameChannel');
    socket.off('newChannel');
    socket.off('removeChannel');
  };
};

export default socketApi;
