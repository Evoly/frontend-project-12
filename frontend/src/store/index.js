import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../slices/messagesSlice';
import channelsReducer from '../slices/channelsSlice';
import modalReducer from '../slices/modalSlice';

export default configureStore({
  reducer: {
    messages: messageReducer,
    channels: channelsReducer,
    modal: modalReducer,
  },
});
