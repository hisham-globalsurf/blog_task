import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import blogReducer from '../features/blog/blogSlice';
import commentReducer from '../features/comment/commentSlice';
import contactReducer from '../features/contact/contactSlice';
import adminReducer from '../features/admin/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    comment: commentReducer,
    admin: adminReducer,
    contact: contactReducer,
  },
});
