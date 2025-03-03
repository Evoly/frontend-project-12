import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { dataRoutes } from '../api/routes';
import api from '../api/requests';

const initialState = {
  messages: [],
  loadingStatus: 'idle',
  error: null,
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await api('get', dataRoutes.messages()); // todo ???
    console.log('fetch', response.data);
    return response.data;
  },
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (newMessage) => {
    const response = await api('post', dataRoutes.messages(), newMessage); 
    console.log('fetch', response.data);
    return response.data;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: { 
    addMessage: (state, action) => {
      console.log('addMessage', action)
      state.messages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;