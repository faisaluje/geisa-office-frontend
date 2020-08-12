import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFirstDateOfMonth, getLastDateOfMonth } from 'app/Utils';
import KehadiranByBulanService from '../services/kehadiraByBulan.service';

export const getListKehadiranByBulan = createAsyncThunk('kehadiranByBulan/getList', async (_id, { getState }) => {
  const { params } = getState().laporan.kehadiranByBulan;
  const listKehadiranByBulan = await KehadiranByBulanService.getListKehadiranByBulan(params);

  return listKehadiranByBulan;
});

const initialState = {
  data: null,
  isRefresh: true,
  isLoading: false,
  isError: false,
  msg: '',
  params: {
    limit: 0,
    tglAwal: getFirstDateOfMonth(),
    tglAkhir: getLastDateOfMonth()
  },
  props: { open: false }
};

const kehadiranByBulanSlice = createSlice({
  name: 'kehadiranByBulan',
  initialState,
  reducers: {
    openKehadiranByBulangDialog: state => {
      state.props.open = true;
    },
    closeKehadiranByBulangDialog: state => {
      state.props.open = false;
    },
    setParamsListKehadiranByBulan: (state, action) => {
      state.params = action.payload;
      state.isRefresh = true;
    },
    refreshListKehadiranByBulan: state => {
      state.isRefresh = true;
    },
    exitListKehadiranByBulan: state => {
      state.params = {
        limit: 0,
        tglAwal: getFirstDateOfMonth(),
        tglAkhir: getLastDateOfMonth()
      };
      state.isRefresh = true;
    }
  },
  extraReducers: {
    [getListKehadiranByBulan.pending]: state => {
      state.isRefresh = false;
      state.isLoading = true;
      state.isError = false;
      state.msg = '';
    },
    [getListKehadiranByBulan.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    [getListKehadiranByBulan.rejected]: (state, action) => {
      state.isError = true;
      state.msg = action.error.message || 'something wrong';
      state.isLoading = false;
    }
  }
});

export const {
  openKehadiranByBulangDialog,
  closeKehadiranByBulangDialog,
  setParamsListKehadiranByBulan,
  refreshListKehadiranByBulan,
  exitListKehadiranByBulan
} = kehadiranByBulanSlice.actions;

export default kehadiranByBulanSlice.reducer;
