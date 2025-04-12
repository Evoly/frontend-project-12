import { useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import MyModal from "./Modal";
import Channels from "./chatComponents/Channels";
import Messages from "./chatComponents/Messages";
import MessageForm from './chatComponents/MessageForm'
import '../css/chatpage.css';

const Chat = ({ props }) => {
  const {
    channels,
    messages,
    message,
    currentChannelId,
    changeCurrentChannel,
    handleSubmit,
    handleMessage,
    handleModal,
    onEmojiClick,
    showPicker,
    handlePicker,
    closeEmojiBox
  } = props;

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
              <MessageForm 
                message={message}
                handleSubmit={handleSubmit}
                handleMessage={handleMessage}
                onEmojiClick={onEmojiClick}
                showPicker={showPicker}
                handlePicker={handlePicker}
                closeEmojiBox={closeEmojiBox}
              />
            </div>
          </div>
        </Col>
      </Row>
      <MyModal changeCurrentChannel={changeCurrentChannel} />
    </main>
  );
};

export default Chat;
