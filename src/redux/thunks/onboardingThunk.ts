

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RegisterPayload {
  full_name: string;
  email_address: string;
  password: string;
  role: string;
}

export const registerUser = createAsyncThunk(
  "onboarding/registerUser",
  async (userData: RegisterPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://lowcost-be.onrender.com/v1/api/register",
        userData,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
