import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import filter from "leo-profanity";

import socket from "../api/socket";
import useAuth from "../hooks";
import {
  addMessage,
  fetchMessages,
  sendMessage,
} from "../slices/messagesSlice";
import {
  addChannel,
  fetchChannels,
  removeChannel,
  renameChannel,
} from "../slices/channelsSlice";
import { setOpen } from "../slices/modalSlice";

import Chat from "../components/Chat";

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  filter.add(filter.getDictionary("ru"));

  const defaultChannelId = "1";
  const [currentChannelId, setCurrentChannelID] = useState(defaultChannelId);
  const [message, setMessage] = useState("");

  const { messages } = useSelector((state) => state.messages);
  const { channels } = useSelector((state) => state.channels);
  const { show } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      console.log("message", message);
      dispatch(addMessage(message));
    });
    socket.on("renameChannel", (message) => {
      dispatch(renameChannel(message));
    });
    socket.on("newChannel", (message) => {
      dispatch(addChannel(message));
    });
    socket.on("removeChannel", (message) => {
      dispatch(removeChannel(message));
      if (currentChannelId === message.id) {
        setCurrentChannelID(defaultChannelId);
      }
    });
    return () => {
      socket.off("newMessage");
      socket.off("renameChannel");
      socket.off("newChannel");
      socket.off("removeChannel");
    };
  }, [dispatch, currentChannelId]);

  const changeCurrentChannel = (id = defaultChannelId) =>
    setCurrentChannelID(id);
  const handleMessage = (event) => setMessage(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredMessage = filter.clean(message);
    const { username } = auth.getUser();
    dispatch(
      sendMessage({
        body: filteredMessage,
        channelId: currentChannelId,
        username,
      }),
    );
    setMessage("");
  };

  const handleModal = (id, type) => dispatch(setOpen(id, type));

  return (
    <>
      <Chat
        props={{
          channels,
          messages,
          message,
          currentChannelId,
          changeCurrentChannel,
          handleSubmit,
          handleMessage,
          handleModal,
          show,
        }}
      />
    </>
  );
};

export default ChatPage;
