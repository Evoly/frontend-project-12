import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../api/socket";

import { Row, Col } from "react-bootstrap";
import MyModal from "./Modal";
import Channels from "./chatComponents/Channels";
import Messages from "./chatComponents/Messages";
import MessageForm from './chatComponents/MessageForm'
import '../css/chatpage.css';

import {
  addMessage,
  fetchMessages,
} from "../slices/messagesSlice";

import {
  addChannel,
  fetchChannels,
  removeChannel,
  renameChannel,
} from "../slices/channelsSlice";

import { setOpen } from "../slices/modalSlice";

const Chat = ({  }) => {
  const dispatch = useDispatch();

  const defaultChannelId = "1";
  const [currentChannelId, setCurrentChannelID] = useState(defaultChannelId);

  const { messages } = useSelector((state) => state.messages);
  const { channels } = useSelector((state) => state.channels);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  /*
  const scrollToBottom = () => {
    
  }
*/
  useEffect(() => {
    socket.on("newMessage", (message) => {
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

  const handleModal = (id, type) => dispatch(setOpen(id, type));

  return (
    <main className="container overflow-hidden vh-100 rounded shadow my-4">
      <Row className="h-100 bg-white flex-md-row">
        <Col
          col={4}
          md={2}
          className="border-end px-0 bg-light flex-column h-100 d-flex"
        >
          <Channels
            channels={channels}
            changeCurrentChannel={changeCurrentChannel}
            handleModal={handleModal}
          />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Messages
              messages={messages}
              channels={channels}
              currentChannelId={currentChannelId}
            />
            <div className="mt-auto px-5 py-3">
              <MessageForm currentChannelId={currentChannelId} />
            </div>
          </div>
        </Col>
      </Row>
      <MyModal changeCurrentChannel={changeCurrentChannel} />
    </main>
  );
};

export default Chat;
