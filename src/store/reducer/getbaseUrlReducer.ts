import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BaseUrlState {
  url: string;
}

const initialState: BaseUrlState = {
  url: "http://localhost:5001",
};

// https://backend.coursex.us
//

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
