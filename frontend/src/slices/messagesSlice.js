import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { dataRoutes } from '../api/routes';
import api from '../api/requests';

const initialState = {
  messages: [],
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
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await api('get', dataRoutes.messages());
    return response.data;
  },
);

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async (newMessage) => {
    const response = await api('post', dataRoutes.messages(), newMessage);    
    return response.data;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => handleLoading(state))
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => handleFailed(state, action))
      .addCase(addMessage.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.messages.push(action.payload);
        state.error = null;
      })
      .addCase(addMessage.rejected, (state, action) => handleFailed(state, action))

  },
});

export default messagesSlice.reducer;
