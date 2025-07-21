import axiosInstance from "../../api/axiosInstance";

// Login
const login = async (credentials, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/login", credentials);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
};

// Register
const register = async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
};

// Logout
const logout = async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
};

// Load user
export const loadUser = async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (err) {
    const status = err.response?.status;
        console.log("LOAD USER ERROR", err.response?.status, err.message); // <-- add this
    const message = err.response?.data?.message || err.message;
    if (status === 401 || status === 500 || message == "Network Error") {
      return thunkAPI.rejectWithValue(null);
    }
    return thunkAPI.rejectWithValue(message);
  }

};

export default { login, register, logout, loadUser };
