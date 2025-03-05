import { configureStore } from '@reduxjs/toolkit';
import { messagesApi } from '../api/messagesApi'
import { channelsApi } from '../api/channelsApi';
import messageReducer from '../slices/messagesSlice';
import channelsReducer from '../slices/channelsSlice';

export default configureStore({
  reducer: { 
    messages: messageReducer,
    channels: channelsReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messagesApi.middleware).concat(channelsApi.middleware),
});



/*
import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from './goodsApi';

export const store = configureStore({
  reducer: {
    [goodsApi.reducerPath]: goodsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(goodsApi.middleware),
})
  */