import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '../slices/messagesSlice';
import channelsReducer from '../slices/channelsSlice';

export default configureStore({
  reducer: { 
    messages: messageReducer,
    channels: channelsReducer,
  },
});