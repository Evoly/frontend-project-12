import { Row, Col, Form, Button, ListGroup, ListGroupItem, InputGroup } from 'react-bootstrap';

const Chat = ({props}) => {
  //  console.log('props', props);
  const { channels, messages, message, activeChannelId, changeActiveChannelId, handleSubmit, handleMessage } = props;
  if (!channels) return;
  console.log('messages:', messages)
  
  const renderListGroup = () =>{
    return channels.map((channel) => (
      <ListGroupItem key={channel.id} as="li" className="w-100 p-0">
        <Button
          type="button"
          className="w-100 rounded-0 text-start btn btn-secondary"
          onClick={() => changeActiveChannelId(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      </ListGroupItem>
    ));
  };


  const renderMessages = (id) => {
    const currentMessages = messages.filter((message) => message.channelId === id);
    const channel = channels.find((channel) => channel.id === id);
    if (!channel) return null;

    return (
      <>
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {channel.name}</b></p>
          <span className="text-muted">{currentMessages.length} сообщения</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {
            currentMessages.map((message) =>(
              <div className="text-break mb-2" key={message.id}><b>{message.username}</b>: {message.body}</div>
            ))
          }          
        </div>
      </>
    );
  };

  return(
    <main className='container overflow-hidden vh-100 rounded shadow my-4'>
      <Row className='h-100 bg-white flex-md-row'>
        <Col col={4} md={2} className='border-end px-0 bg-light flex-column h-100 d-flex'>
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4"><b>Каналы</b>
            <Button
              variant=''
              type="button"
              className="p-0 text-primary btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                width="20" height="20" fill="currentColor">
                <path
                  d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z">
                </path>
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4">
                </path>
              </svg>
              <span className="visually-hidden">+</span>
            </Button>
            </div>
          <ListGroup as="ul"
            id="channels-box"
            className="p-2"
          >
            {renderListGroup()}
          </ListGroup>
        </Col>
        <Col className='p-0 h-100'>
          <div className="d-flex flex-column h-100">
            {renderMessages(activeChannelId)}
            <div className="mt-auto px-5 py-3">
              <Form noValidate className='py-1 border rounded-2' onSubmit={handleSubmit}>
                <InputGroup>
                  <Form.Control
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..." 
                    className="border-0 p-0 ps-2 form-control"
                    onChange={handleMessage}
                    value={message}
                  />
                  <Button
                    variant=""
                    type='submit'
                    className="btn-group-vertical"
                    disabled=""                    
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                      width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z">
                      </path>
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Col>

      </Row>
    </main>
  )
};

export default Chat;
