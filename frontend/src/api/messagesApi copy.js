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
  tagTypes: ['Messages'],
  endpoints: (build) => ({
    fetchMessages: build.query({
      query: () => 'messages',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Messages', id })), 'Messages']
          : ['Messages'],
      /*
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Messages', id })),
            { type: 'Messages', id: 'LIST' }
          ]
          : [{ type: 'Messages', id: 'LIST' }]
      */
    }),
    addMessage: build.mutation({
      queryFn: (body) => {
        console.log('body', body)
        return socket.emit('newMessage', body);
      },
      onQueryStarted: () => {
        console.log('Sending message...');
      },
      invalidatesTags: ['Messages'],
    }),
  })
});

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('newMessage', () => {
  messagesApi.endpoints.fetchMessages.invalidate(); // Обновляем данные RTK Query при получении новых сообщений
});

const { useFetchMessagesQuery, useAddMessageMutation, useRemoveMessageMutation } = messagesApi;

export {
  useFetchMessagesQuery as fetchMessages,
  useAddMessageMutation as addMessage,
  useRemoveMessageMutation as removeMessage,
};
