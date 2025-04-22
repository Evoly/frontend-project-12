import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import MyModal from './Modal';
import Channels from './chatComponents/Channels';
import Messages from './chatComponents/Messages';
import MessageForm from './chatComponents/MessageForm';
import '../css/chatpage.css';

import socketApi from '../api/socket';

import { fetchMessages } from '../slices/messagesSlice';
import { fetchChannels } from '../slices/channelsSlice';

import { setOpen } from '../slices/modalSlice';

const Chat = () => {
  const dispatch = useDispatch();

  const { messages } = useSelector((state) => state.messages);
  const { channels } = useSelector((state) => state.channels);
  const { activeChannelId } = useSelector((state) => state.channels);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    const socketListeners = socketApi(dispatch);
    return socketListeners;
  }, [dispatch]);

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
            handleModal={handleModal}
          />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Messages
              messages={messages}
              channels={channels}
              activeChannelId={activeChannelId}
            />
            <div className="mt-auto px-5 py-3">
              <MessageForm activeChannelId={activeChannelId} />
            </div>
          </div>
        </Col>
      </Row>
      <MyModal />
    </main>
  );
};

export default Chat;
