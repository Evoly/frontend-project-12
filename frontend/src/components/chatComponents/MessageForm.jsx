import React, { useRef, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import EmojiPicker from 'emoji-picker-react';
import Smile from '../svg/Smile';
import Arrow from '../svg/Arrow';

const MessageForm = ({
  message,
  handleSubmit,
  handleMessage,
  onEmojiClick,
  showPicker,
  handlePicker,
  closeEmojiBox,
}) => {
  const { t } = useTranslation();
  const messageRef = useRef(null);

  useEffect(() => {
    if (!showPicker) {
      messageRef.current.focus();
    }
  }, [showPicker]);

  useEffect(() => {
    if (!showPicker) return;
    document.addEventListener('keydown', closeEmojiBox);

    return () => document.removeEventListener('keydown', closeEmojiBox);
  }, [showPicker]);

  return (
    <div className='mt-auto px-5 py-3'>
      {showPicker && (
        <EmojiPicker onEmojiClick={onEmojiClick} emojiContainerClassName='emoji-box' />
      )}
      <Form noValidate className='p-1 border rounded-2' onSubmit={handleSubmit}>
        <InputGroup>
          <Smile
            handlePicker={handlePicker}
            classNames={'message-svg position-absolute top-50 translate-middle'}
          />
          <Form.Control
            name='body'
            aria-label={t('chatPage.newMessage')}
            placeholder={t('chatPage.placeholder')}
            className='border-0 p-0 ps-5'
            onChange={handleMessage}
            value={message}
            ref={messageRef}
          />
          <Button variant='' type='submit' className='btn-group-vertical' disabled=''>
            <Arrow />
            <span className='visually-hidden'>{t('chatPage.submit')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;