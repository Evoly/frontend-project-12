import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { dataRoutes } from "../api/routes";
import api from "../api/requests";

const initialState = {
  channels: [],
  loadingStatus: "idle",
  error: null,
};

const handleLoading = (state) => {
  state.loadingStatus = "loading";
  state.error = null;
};
const handleFailed = (state, action) => {
  state.loadingStatus = "failed";
  state.error = action.error;
};

export const fetchChannels = createAsyncThunk(
  "channels/fetchChannels",
  async () => {
    const response = await api("get", dataRoutes.channels());
    return response.data;
  },
);

export const addChannelRequest = createAsyncThunk(
  "channels/addChannel",
  async ({ name }) => {
    const response = await api("post", dataRoutes.channels(), { name });
    return response.data;
  },
);

export const removeChannelRequest = createAsyncThunk(
  "channels/removeChannel",
  async ({ id }) => {
    console.log("id remove", id);
    const response = await api("delete", dataRoutes.channel(id));
    console.log("removeChannel", response.data);
    return response.data;
  },
);

export const renameChannelRequest = createAsyncThunk(
  "channels/renameChannel",
  async ({ id, name }) => {
    const response = await api("patch", dataRoutes.channel(id), { name });
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    renameChannel: (state, action) => {
      const channel = state.channels.find(({ id }) => id == action.payload.id);
      channel.name = action.payload.name;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter(
        ({ id }) => id !== action.payload.id,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => handleLoading(state))
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loadingStatus = "idle";
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) =>
        handleFailed(state, action),
      )
      .addCase(addChannelRequest.pending, (state) => handleLoading(state))
      .addCase(addChannelRequest.rejected, (state, action) =>
        handleFailed(state, action),
      )
      .addCase(removeChannelRequest.pending, (state) => handleLoading(state))
      .addCase(removeChannelRequest.rejected, (state, action) =>
        handleFailed(state, action),
      )
      .addCase(renameChannelRequest.pending, (state) => handleLoading(state))
      .addCase(renameChannelRequest.rejected, (state, action) =>
        handleFailed(state, action),
      );
  },
});

export const { renameChannel, removeChannel, addChannel } =
  channelsSlice.actions;
export default channelsSlice.reducer;
