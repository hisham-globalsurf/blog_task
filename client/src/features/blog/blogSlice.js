import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
  blogs: [],
  myBlogs: [],
  singleBlog: null,
  isLoading: false,
  error: null,
};

// Thunks
export const fetchAllBlogs = createAsyncThunk(
  "blog/fetchAll",
  blogService.getAllBlogs
);
export const fetchBlogById = createAsyncThunk(
  "blog/fetchById",
  blogService.getBlogById
);
export const fetchMyBlogs = createAsyncThunk(
  "blog/fetchMyBlogs",
  blogService.getMyBlogs
);
export const createBlog = createAsyncThunk(
  "blog/create",
  blogService.createBlog
);
export const updateBlog = createAsyncThunk(
  "blog/update",
  blogService.updateBlog
);
export const deleteBlog = createAsyncThunk(
  "blog/delete",
  blogService.deleteBlog
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All blogs
      .addCase(fetchAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload.blogs;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Single blog
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.singleBlog = action.payload.blog;
      })
      // My blogs
      .addCase(fetchMyBlogs.fulfilled, (state, action) => {
        state.myBlogs = action.payload.blogs;
      })
      // Create
      .addCase(createBlog.fulfilled, (state, action) => {
        state.myBlogs.push(action.payload.blog);
      })
      // Update
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.myBlogs = state.myBlogs.map((blog) =>
          blog._id === action.payload.blog._id ? action.payload.blog : blog
        );
      })
      // Delete
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.myBlogs = state.myBlogs.filter((blog) => blog._id !== deletedId);
      });
  },
});

export default blogSlice.reducer;
