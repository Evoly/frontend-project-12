import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

import { dataRoutes } from '../api/routes';
import api from '../api/requests';

import useAuth from '../hooks';

import Chat from '../components/Chat';

const socket = io();

const ChatPage = () => {
  const auth = useAuth(); // todo

  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChannelId, setActiveId] = useState('1'); // todo
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getChannels = async () => {
      const res = await api('get', dataRoutes.channels());
      setChannels(res.data);
    };
    getChannels();

    const getMessages = async () => {
      const res = await api('get', dataRoutes.messages());
      setMessages(res.data);
    };
    getMessages();
  }, []);

  const changeActiveId = (id) => setActiveId(id);

  const handleMessage = (event) => setMessage(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username } = auth.getUser();
    console.log('username:', username)
    const newMessage = { body: message, channelId: activeChannelId, username };
    await api('post', dataRoutes.messages(), newMessage);
  }

  socket.on('newMessage', (payload) => {
    setMessages([...messages, payload]);
  });

  return (
    <Chat  props = {{ channels, messages, message, activeChannelId, changeActiveId, handleSubmit, handleMessage }} />
  )
};

export default ChatPage;
