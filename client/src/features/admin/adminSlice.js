import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";
import { toast } from "sonner";

// Thunks
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, thunkAPI) => {
    const result = await adminService.getAllUsers(_, thunkAPI);
    if (result?.message) toast.error(result.message);
    return result;
  }
);

export const toggleUserBlock = createAsyncThunk(
  "admin/toggleUserBlock",
  async (id, thunkAPI) => {
    const result = await adminService.toggleBlockUser(id, thunkAPI);
    if (result?.message) {
      toast.error(result.message);
    } else {
      toast.success("User status updated");
    }
    return result.user;
  }
);

export const fetchBlogsByUser = createAsyncThunk(
  "admin/fetchBlogsByUser",
  async (userId, thunkAPI) => {
    const result = await adminService.getBlogsByUserId(userId, thunkAPI);
    if (result?.message) toast.error(result.message);
    return result.blogs;
  }
);

// Slice
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    userBlogs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminState: (state) => {
      state.users = [];
      state.userBlogs = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle User Block
      .addCase(toggleUserBlock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserBlock.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(toggleUserBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Blogs By User
      .addCase(fetchBlogsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userBlogs = action.payload;
      })
      .addCase(fetchBlogsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;
