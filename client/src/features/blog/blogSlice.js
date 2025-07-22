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
      // Fetch All Blogs
      .addCase(fetchAllBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload.blogs;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Fetch Single Blog
      .addCase(fetchBlogById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleBlog = action.payload.blog;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Fetch My Blogs
      .addCase(fetchMyBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myBlogs = action.payload.blogs;
      })
      .addCase(fetchMyBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myBlogs.push(action.payload.blog);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myBlogs = state.myBlogs.map((blog) =>
          blog._id === action.payload.blog._id ? action.payload.blog : blog
        );
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.meta.arg;
        state.myBlogs = state.myBlogs.filter((blog) => blog._id !== deletedId);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
