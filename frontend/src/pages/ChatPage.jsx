import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { io } from "socket.io-client";
//  import { dataRoutes } from '../api/routes';
//  import api from '../api/requests';

import useAuth from '../hooks';
import { addMessage, fetchMessages, sendMessage } from '../slices/messagesSlice';
import { fetchChannels } from '../slices/channelsSlice';

import Chat from '../components/Chat';
const socket = io();

const ChatPage = () => {
  const auth = useAuth(); // todo

  const [activeChannelId, setActiveChannelId] = useState('1'); // todo
  const [message, setMessage] = useState('');

  const messages = useSelector((state) => state.messages.messages);
  const channels = useSelector((state) => state.channels.channels);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());

    socket.on('newMessage', (payload) => {
      console.log('socket addMsg:', payload);
      dispatch(addMessage(payload));
    });
    return () => {
      socket.off('newMessage');
    }

  }, [dispatch]);

  const changeActiveChannelId = (id) => setActiveChannelId(id);

  const handleMessage = (event) => setMessage(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username } = auth.getUser();
    const newMessage = { body: message, channelId: activeChannelId, username };
    dispatch(sendMessage(newMessage));
    setMessage('');
  }
  return (
    <Chat  props = {{ channels, messages, message, activeChannelId, changeActiveChannelId, handleSubmit, handleMessage }} />
  )
};

export default ChatPage;
