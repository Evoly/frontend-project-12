import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import socket from '../api/socket';
import useAuth from '../hooks';
import { addMessage, fetchMessages, sendMessage } from '../slices/messagesSlice';
import { addChannel, fetchChannels, removeChannel, renameChannel } from '../slices/channelsSlice';
import { setOpen } from '../slices/modalSlice';

import Chat from '../components/Chat';

const ChatPage = () => {
  const auth = useAuth(); // todo
  const dispatch = useDispatch();  

  const [currentChannelId, setCurrentChannelID] = useState('1'); // todo
  const [message, setMessage] = useState('');

  const { messages } = useSelector((state) => state.messages);
  const { channels } = useSelector((state) => state.channels);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      console.log('message', message)
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
  }, [dispatch])


  const changeCurrentChannel = (id) => setCurrentChannelID(id);
  const handleMessage = (event) => setMessage(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username } = auth.getUser();

    //socket.emit('newMessage', { body: message, channelId: currentChannelId, username });
    dispatch(sendMessage({ body: message, channelId: currentChannelId, username }));
    setMessage('');
  };

  const handleModal = (id, type) => dispatch(setOpen(id, type));

  return (
    <>
      <Chat props={{ channels, messages, message, currentChannelId, changeCurrentChannel, handleSubmit, handleMessage, handleModal }} />
    </>    
  )
};

export default ChatPage;
