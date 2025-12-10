import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Named async thunks (these MUST be exported as named exports)
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addUser = createAsyncThunk("users/addUser", async (userData) => {
  const res = await axios.post(API_URL, userData);
  return res.data;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData) => {
    const res = await axios.put(`${API_URL}/${userData.id}`, userData);
    return res.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // if you also want local-only reducers, add here
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // addUser
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.list.findIndex((u) => u.id === action.payload.id);
        if (idx >= 0) state.list[idx] = action.payload;
      })

      // deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

// Export named reducers if needed
export const { clearError } = userSlice.actions;

// Default export must be the reducer only
export default userSlice.reducer;
