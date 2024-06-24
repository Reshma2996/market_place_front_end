import { configureStore } from '@reduxjs/toolkit';
import equipmentReducer from './equipmentSlice';
import bookingReducer from './bookingSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
    booking: bookingReducer,
    user: userReducer,
  },
});

export default store;