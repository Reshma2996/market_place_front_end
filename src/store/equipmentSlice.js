import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEquipments, createEquipment, updateEquipment, deleteEquipment } from '../api';

export const getEquipments = createAsyncThunk('equipment/getEquipments', fetchEquipments);

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: {
    equipments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEquipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEquipments.fulfilled, (state, action) => {
        state.loading = false;
        state.equipments = action.payload.data;
      })
      .addCase(getEquipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default equipmentSlice.reducer;