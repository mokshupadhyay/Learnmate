import { configureStore, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// Define initial state for authentication
const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

// Create authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'], // Specify which slices to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
});

// Export actions
export const { loginSuccess, logout } = authSlice.actions;

export default store;
