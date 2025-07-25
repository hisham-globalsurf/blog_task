// src/features/contact/contactSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

const initialState = {
  contacts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

// ⬇ Submit contact form
export const submitContactForm = createAsyncThunk(
  "contact/submitForm",
  async (formData, thunkAPI) => {
    try {
      return await contactService.submitContactForm(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Submission failed"
      );
    }
  }
);

// ⬇ Get all contact submissions
export const fetchContacts = createAsyncThunk(
  "contact/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await contactService.getAllContacts();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch contacts"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit
      .addCase(submitContactForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })

      // Get all
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload.data;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
