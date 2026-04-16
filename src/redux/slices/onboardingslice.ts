

import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../thunks/onboardingThunk";

interface OnboardingState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: OnboardingState = {
  loading: false,
  success: false,
  error: null,
};



const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default onboardingSlice.reducer;
