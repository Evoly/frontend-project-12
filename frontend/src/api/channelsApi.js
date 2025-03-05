import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
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
    fetchChannels: build.query({
      query: () => 'channels',
    }),
    addChannel: build.mutation({
      query: (body) => ({
        url: 'channels',
        method: 'POST',
        body,
      }),
    }),
    removeChannel: build.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
    })
  })
});

const { useFetchChannelsQuery, useAddChannelMutation, useRemoveChannelMutation } = channelsApi;

export {
  useFetchChannelsQuery as fetchChannels,
  useAddChannelMutation as addChannel,
  useRemoveChannelMutation as removeChannel,
};
