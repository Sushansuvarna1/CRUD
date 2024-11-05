import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerForm = createAsyncThunk(
  "registerForm",
  async (formData, { rejectWithValue }) => {
    try {
      const registerResponse = await axios.post(
        "http://localhost:3070/user/register",
        formData
      );
      return registerResponse.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loginForm = createAsyncThunk(
  "loginForm",
  async (formData, { rejectWithValue }) => {
    try {
      const loginResponse = await axios.post(
        "http://localhost:3070/user/login",
        formData
      );
      console.log(loginResponse.data)
      localStorage.setItem("token", loginResponse.data.token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getAccount = createAsyncThunk(
    "getAccount",
    async (_, { rejectWithValue }) => {
      try {
        const account = await axios.get(
          "http://localhost:3070/user/account",{
            headers:{
                "authentication":localStorage.getItem("token")
            }
         }
          
        );
  console.log("login",account.data)
 return account.data
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );

const initialState = {
    account: {},
  loading: false,
  error: null,
};
const validationReducer = createSlice({
  name: "validationReducer",
  initialState,
  extraReducers: (builder) => {
    builder
      
      .addCase(getAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.account =  {...action.payload}
        console.log("account",state.account)
       
      })
      .addCase(getAccount.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default validationReducer.reducer;
