import axiosInstance from '../../api/axiosInstance';

// Get all blogs
const getAllBlogs = async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/blog/all');
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
};

// Get a single blog by ID
const getBlogById = async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.get(`/blog/${id}`);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
};

// Get my blogs (admin only)
const getMyBlogs = async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/blog/myblogs');
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
};

// Create blog
const createBlog = async (data, thunkAPI) => {
  try {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);

    if (Array.isArray(data.tags)) {
      data.tags.forEach(tag => formData.append('tags[]', tag));
    }

    if (Array.isArray(data.attachments)) {
      data.attachments.forEach(file => formData.append('attachments', file));
    }

    const res = await axiosInstance.post('/blog/myblog/create', formData);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
};

// Update blog
const updateBlog = async (id, data, thunkAPI) => {
  try {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);

    if (Array.isArray(data.tags)) {
      data.tags.forEach(tag => formData.append('tags[]', tag));
    }

    if (Array.isArray(data.attachments)) {
      data.attachments.forEach(file => formData.append('attachments', file));
    }

    const res = await axiosInstance.put(`/blog/myblog/${id}`, formData);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
};

// Delete blog
const deleteBlog = async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.delete(`/blog/myblog/${id}`);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
};

export default {
  getAllBlogs,
  getBlogById,
  getMyBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
