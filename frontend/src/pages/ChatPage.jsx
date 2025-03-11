import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { io } from "socket.io-client";
import { dataRoutes } from '../api/routes';
import api from '../api/requests';

import useAuth from '../hooks';
import { addMessage, fetchMessages } from '../slices/messagesSlice';
import { fetchChannels } from '../slices/channelsSlice';
import { setOpen } from '../slices/modalSlice';

import Chat from '../components/Chat'; 


const ChatPage = () => {
  //  const socket = io();
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

  const changeCurrentChannel = (id) => setCurrentChannelID(id);
  const handleMessage = (event) => setMessage(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username } = auth.getUser();

    dispatch(addMessage({ body: message, channelId: currentChannelId, username }));
    setMessage('');
  };

  const handleModal = (id, type) => dispatch(setOpen(id, type));


  return (
    <Chat props={{ channels, messages, message, currentChannelId, changeCurrentChannel, handleSubmit, handleMessage, handleModal }} />
  )
};

export default ChatPage;
