import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BaseUrlState {
  url: string;
}

const initialState: BaseUrlState = {
  url:
    import.meta.env.VITE_NODE_ENV === "production"
      ? "https://backend.coursex.us"
      : "http://localhost:5001",
};

const getbaseUrlReducer = createSlice({
  name: "baseUrl",
  initialState,
  reducers: {
    setBaseUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setBaseUrl } = getbaseUrlReducer.actions;
export default getbaseUrlReducer.reducer;
