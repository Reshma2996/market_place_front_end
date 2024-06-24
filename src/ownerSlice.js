import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ownerregisterUser, ownerloginUser } from '../src/api'; // Adjust based on your actual API functions

// Async Thunks for owner register and login
export const registerOwner = createAsyncThunk('owner/register', async (ownerData) => {
  try {
    const response = await ownerregisterUser(ownerData); // Adjust function call as per your API
    return response.data; // Assuming response structure has a 'data' field
  } catch (error) {
    // Handle error if needed
    throw Error(error.message);
  }
});

export const ownerLogin = createAsyncThunk('owner/login', async (credentials) => {
  try {
    const response = await ownerloginUser(credentials); // Adjust function call as per your API
    return response.data; // Assuming response structure has a 'data' field
  } catch (error) {
    // Handle error if needed
    throw Error(error.message);
  }
});

// Owner slice
const ownerSlice = createSlice({
  name: 'owner',
  initialState: {
    ownerInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.ownerInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.ownerInfo = action.payload; // Assuming your API response structure assigns payload to state
        state.error = null; // Clear any previous errors
      })
      .addCase(registerOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(ownerLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(ownerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.ownerInfo = action.payload; // Assuming your API response structure assigns payload to state
        state.error = null; // Clear any previous errors
      })
      .addCase(ownerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { logout } = ownerSlice.actions;
export default ownerSlice.reducer;
