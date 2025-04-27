import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import socket from '../api/socket';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem('userId'));
      if (token) {
        headers.set('Authorization', `Bearer ${token.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => 'messages',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          socket.on('newMessage', (message) => {
            updateCachedData((draft) => {
              draft.push(message);
            });
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        if (socket) socket.close();
      },
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: 'messages',
        method: 'POST',
        body: message,
      }),
    }),
  }),
});
/*
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => handleLoading(state))
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => handleFailed(state, action))
      .addCase(sendMessage.rejected, (state, action) => handleFailed(state, action))
      .addCase(removeChannel, (state, action) => {
        state.messages = state.messages.filter(({ channelId }) => channelId !== action.payload.id);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
*/

export const { useGetMessagesQuery, useSendMessageMutation } = messagesApi;
