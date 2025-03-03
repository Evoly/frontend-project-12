import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { dataRoutes } from '../api/routes';
import api from '../api/requests';

const initialState = {
  channels: [],
  loadingStatus: 'idle',
  error: null,
};

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await api('get', dataRoutes.channels()); // todo ???
    console.log('fetch channels', response.data);
    return response.data;
  },
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async () => {
    const response = await api('post', dataRoutes.channels()); // todo ???
    console.log('fetch', response.data);
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        console.log('fetchChannels', state);
        state.loadingStatus = 'idle';
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(addChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        state.channels.push(action.payload)
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(addChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
  },
});

export default channelsSlice.reducer;