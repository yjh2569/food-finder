import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../api";

const initialState = {
  isLogin: false,
  userInfo: null,
  status: "idle",
  error: null,
};

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (userInfo) => {
    const response = await request("post", "/api/user/login", userInfo);
    return response;
  },
);

export const userLogout = createAsyncThunk("user/userLogout", async () => {
  const response = await request("post", "/api/user/logout");
  return response;
});

export const getInfo = createAsyncThunk("user/getInfo", async () => {
  const response = await request("get", "/api/user/info");
  return response;
});

export const userReducer = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.status = "loading";
    },
    [userLogin.fulfilled]: (state, action) => {
      if (action.payload !== null && action.payload !== "") {
        state.status = "successed";
        state.isLogin = true;
        state.userInfo = action.payload;
      } else {
        state.status = "failed";
        state.isLogin = false;
        state.userInfo = null;
      }
    },
    [userLogin.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [userLogout.pending]: (state, action) => {
      state.status = "loading";
    },
    [userLogout.fulfilled]: (state, action) => {
      state.status = "idle";
      state.isLogin = false;
      state.userInfo = null;
    },
    [userLogout.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [getInfo.fulfilled]: (state, action) => {
      if (action.payload !== null && action.payload !== "") {
        state.isLogin = true;
        state.userInfo = action.payload;
      }
    },
  },
});

export default userReducer.reducer;

export const selectIsLogin = (state) => state.isLogin;

export const selectUserInfo = (state) => state.userInfo;
