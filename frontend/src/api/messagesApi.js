import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from "socket.io-client";
const socket = io();

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/v1' ,
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem('userId'));
      if (token) {
        headers.set('authorization', `Bearer ${token.token}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    fetchMessages: build.query({
      query: () => 'messages',
    }),
    
    addMessage: build.mutation({
      queryFn: () => ({ data: {} }),
      onQueryStarted: (body) => {
        console.log('Sending message...');
        socket.emit('newMessage', body);
      },
    }),
})
})


socket.on('connect', () => {
  console.log('connected to server');
});
socket.on('connect_error', (error) => {
  console.error('Connection Error:', error);
});
/*
socket.on('newMessage', () => {
  messagesApi.endpoints.fetchMessages.invalidate(); // Обновляем данные RTK Query при получении новых сообщений
});
*/
const { useFetchMessagesQuery, useAddMessageMutation, useRemoveMessageMutation } = messagesApi;

export {
  useFetchMessagesQuery as fetchMessages,
  useAddMessageMutation as addMessage,
  useRemoveMessageMutation as removeMessage,
};


/*
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        // create a websocket connection when the cache subscription starts
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event) => {
            const data = event.data;
            console.log('data:', data)

            updateCachedData((draft) => {
              console.log('draft', draft)
              draft.push(data)
            })
          }
          socket.on('newMessage', listener)

        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        socket.off();
      },
      */