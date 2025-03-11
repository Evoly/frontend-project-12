import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { dataRoutes } from '../api/routes';
import api from '../api/requests';

const initialState = {
  channels: [],
  loadingStatus: 'idle',
  error: null,
};

const handleLoading = (state) => {
  state.loadingStatus = 'loading';
  state.error = null;
};
const handleFailed = (state, action) => {
  state.loadingStatus = 'failed';
  state.error = action.error;
}

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await api('get', dataRoutes.channels());
    return response.data;
  },
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({name}) => {
    const response = await api('post', dataRoutes.channels(), {name});
    return response.data;
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({id}) => {
    console.log('id remove', id)
    const response = await api('delete', dataRoutes.channel(id));
    console.log('removeChannel', response.data);
    return response.data;
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({id, name}) => {
    const response = await api('patch', dataRoutes.channel(id), {name});
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => handleLoading(state))
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => handleFailed(state, action))
      .addCase(addChannel.pending, (state) => handleLoading(state))
      .addCase(addChannel.fulfilled, (state, action) => {
        state.channels.push(action.payload)
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(addChannel.rejected, (state, action) => handleFailed(state, action))
      .addCase(removeChannel.pending, (state) => handleLoading(state))
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.channels = state.channels.filter(({ id }) => id !== action.payload.id);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(removeChannel.rejected, (state, action) => handleFailed(state, action))
      .addCase(renameChannel.pending, (state) => handleLoading(state))
      .addCase(renameChannel.fulfilled, (state, action) => {
        console.log('data rename:', action.payload);
        const channel = state.channels.find(({ id }) => id == action.payload.id);
        channel.name = action.payload.name;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(renameChannel.rejected, (state, action) => handleFailed(state, action))
  },
});

export default channelsSlice.reducer;