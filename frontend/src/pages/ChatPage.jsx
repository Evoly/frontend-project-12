import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import useAuth from '../hooks';
import { addMessage, fetchMessages,  } from '../api/messagesApi';
import { fetchChannels, addChannel, removeChannel } from '../api/channelsApi';

import Chat from '../components/Chat';

const ChatPage = () => {
  const auth = useAuth(); // todo

  const [activeChannelId, setActiveChannelId] = useState('1'); // todo
  const [message, setMessage] = useState('');

  const { data: messages = [], isLoading} = fetchMessages();
  const [sendMessage] = addMessage();
  
  const { data: channels = [] } = fetchChannels();
  const [remove] = removeChannel();
  const [sendChannel] = addChannel();

  const changeActiveChannelId = (id) => setActiveChannelId(id);

  const handleMessage = (event) => setMessage(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username } = auth.getUser();
    const newMessage = { body: message, channelId: activeChannelId, username };
    console.log('sendMessage:', sendMessage, newMessage);
    sendMessage(newMessage).unwrap();
    setMessage('');
  };

  return (
    <Chat props={{messages, message, activeChannelId, changeActiveChannelId, handleSubmit, handleMessage }} />
  )
};

export default ChatPage;
