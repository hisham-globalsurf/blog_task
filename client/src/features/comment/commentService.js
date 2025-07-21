import axiosInstance from '../../api/axiosInstance';

//  Get comments for a blog post
const getComments = async (blogId, thunkAPI) => {
  try {
    const res = await axiosInstance.get(`/comments/${blogId}`);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
};

// Add a new comment to a blog post
const addComment = async ({ blogId, content }, thunkAPI) => {
  try {
    const res = await axiosInstance.post(`/comments/${blogId}`, { content });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
};

export default {
  getComments,
  addComment,
};
