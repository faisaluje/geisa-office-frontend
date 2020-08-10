import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFirstDateOfMonth, getLastDateOfMonth } from 'app/Utils';
import KehadiranByPegawaiService from '../services/kehadiraByPegawai.service';

export const getListKehadiranByPegawai = createAsyncThunk('kehadiranByPegawai/getList', async (_id, { getState }) => {
  const { params } = getState().laporan.kehadiranByPegawai;
  const listKehadiranByPegawai = await KehadiranByPegawaiService.getListKehadiranByPegawai({
    ...params,
    pegawaiId: params.pegawai?.id || ''
  });

  return listKehadiranByPegawai;
});

const initialState = {
  data: null,
  isRefresh: false,
  isLoading: false,
  isError: false,
  msg: '',
  params: {
    limit: 0,
    pegawai: null,
    tglAwal: getFirstDateOfMonth(),
    tglAkhir: getLastDateOfMonth()
  },
  props: { open: false }
};

const kehadiranByPegawaiSlice = createSlice({
  name: 'kehadiranByPegawai',
  initialState,
  reducers: {
    openKehadiranByPegawaigDialog: state => {
      state.props.open = true;
    },
    closeKehadiranByPegawaigDialog: state => {
      state.props.open = false;
    },
    setParamsListKehadiranByPegawai: (state, action) => {
      state.params = action.payload;
      state.isRefresh = true;
    },
    refreshListKehadiranByPegawai: state => {
      state.isRefresh = true;
    },
    exitListKehadiranByPegawai: state => {
      state.params = {
        limit: 0,
        pegawai: null,
        tglAwal: getFirstDateOfMonth(),
        tglAkhir: getLastDateOfMonth()
      };
      state.isRefresh = true;
    }
  },
  extraReducers: {
    [getListKehadiranByPegawai.pending]: state => {
      state.isRefresh = false;
      state.isLoading = true;
      state.isError = false;
      state.msg = '';
    },
    [getListKehadiranByPegawai.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    [getListKehadiranByPegawai.rejected]: (state, action) => {
      state.isError = true;
      state.msg = action.error.message || 'something wrong';
      state.isLoading = false;
    }
  }
});

export const {
  openKehadiranByPegawaigDialog,
  closeKehadiranByPegawaigDialog,
  setParamsListKehadiranByPegawai,
  refreshListKehadiranByPegawai,
  exitListKehadiranByPegawai
} = kehadiranByPegawaiSlice.actions;

export default kehadiranByPegawaiSlice.reducer;
