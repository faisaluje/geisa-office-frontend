import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import PegawaiService from '../services/pegawai.service';

export const getListPegawai = createAsyncThunk('pegawai/getListPegawai', async (_id, { getState }) => {
  const { params } = getState().pegawai.table;
  const pegawais = await PegawaiService.getListPegawaiData(params);
  if (!pegawais.success) {
    throw new Error(pegawais.msg);
  }

  return pegawais.data;
});

const initialState = {
  data: null,
  isLoading: true,
  isError: false,
  isRefresh: true,
  msg: '',
  params: { page: 1, tgl: moment().format('YYYY-MM-DD') }
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setParamsListPegawai: (state, action) => {
      state.params = action.payload;
      state.isRefresh = true;
    },
    refreshListPegawai: state => {
      state.isRefresh = true;
    },
    exitListPegawai: state => {
      state.params = { page: 1, tgl: moment().format('YYYY-MM-DD') };
      state.isRefresh = true;
    }
  },
  extraReducers: {
    [getListPegawai.pending]: state => {
      state.isRefresh = false;
      state.isLoading = true;
      state.isError = false;
      state.msg = '';
    },
    [getListPegawai.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    [getListPegawai.rejected]: (state, action) => {
      state.isError = true;
      state.msg = action.error.message || 'something wrong';
      state.isLoading = false;
    }
  }
});

export const { setParamsListPegawai, refreshListPegawai, exitListPegawai } = tableSlice.actions;

export default tableSlice.reducer;
