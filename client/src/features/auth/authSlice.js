import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  isAdmin: null,
  isLoading: false,
  error: null,
  loadingUser: false,
};

export const login = createAsyncThunk("auth/login", authService.login);
export const register = createAsyncThunk("auth/register", authService.register);
export const loadUser = createAsyncThunk("auth/loadUser", authService.loadUser);
export const logout = createAsyncThunk("auth/logout", authService.logout);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAdmin = action.payload.user?.role === "admin";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      })

      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(loadUser.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAdmin = action.payload?.role === "admin";
        state.loadingUser = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.user = null;
        state.loadingUser = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAdmin = null;
      });
  },
});

export default authSlice.reducer;
