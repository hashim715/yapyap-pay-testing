import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (baseURL: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/v1/auth/me`, {
        withCredentials: true,
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Authentication failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
