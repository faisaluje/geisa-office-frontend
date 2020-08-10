import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LogsService from 'app/main/mesin/services/logs.service';
import PegawaiService from '../services/pegawai.service';
import { refreshListPegawai } from './tableSlice';

export const savePegawai = createAsyncThunk('pegawai/savePegawai', async (data, { dispatch }) => {
  let result = { success: false };
  if (!data.id) {
    result = await PegawaiService.createPegawai(data);
  } else {
    const { id } = data;
    delete data.id;
    result = await PegawaiService.updatePegawai(id, data);
  }

  if (!result.success) {
    throw new Error(result.msg);
  }

  dispatch(refreshListPegawai());
  return result.data;
});

export const getListPegawaiLogs = createAsyncThunk('pegawai/getListLogs', async (pegawaiId, { getState }) => {
  const { params } = getState().pegawai.form.logs;
  const response = await LogsService.getListLogsData({ ...params, pegawaiId });
  if (!response.success) {
    throw new Error(response.msg);
  }

  return response.data;
});

export const refreshListPegawaiLogs = () => (dispatch, getState) => {
  const { id } = getState().pegawai.form.data;
  dispatch(getListPegawaiLogs(id));
};

const initialState = {
  data: null,
  logs: {
    data: null,
    isLoading: false,
    isError: false,
    msg: '',
    params: { page: 1 }
  },
  isLoading: false,
  isError: false,
  msg: '',
  props: { open: false }
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setPegawaiForm: (state, action) => {
      state.data = action.payload;
    },
    openPegawaiDialog: state => {
      state.props.open = true;
    },
    closePegawaiDialog: state => {
      state.props.open = false;
      state.isError = false;
      state.msg = '';
      state.data = null;
    },
    setParamsListPegawaiLogs: (state, action) => {
      state.logs.params = action.payload;
    },
    clearParamsListPegawaiLogs: state => {
      state.logs.params = { page: 1 };
    }
  },
  extraReducers: {
    [savePegawai.pending]: state => {
      state.isLoading = true;
      state.isError = false;
      state.msg = '';
    },
    [savePegawai.fulfilled]: (state, action) => {
      state.msg = action.payload;
      state.isLoading = false;
    },
    [savePegawai.rejected]: (state, action) => {
      state.isError = true;
      state.msg = action.error.message || 'something wrong';
      state.isLoading = false;
    },
    [getListPegawaiLogs.pending]: state => {
      state.logs.isLoading = true;
      state.logs.isError = false;
      state.logs.msg = '';
    },
    [getListPegawaiLogs.fulfilled]: (state, action) => {
      state.logs.data = action.payload;
      state.logs.isLoading = false;
    },
    [getListPegawaiLogs.rejected]: (state, action) => {
      state.logs.isError = true;
      state.logs.msg = action.error.message || 'something wrong';
      state.logs.isLoading = false;
    }
  }
});

export const {
  setPegawaiForm,
  openPegawaiDialog,
  closePegawaiDialog,
  setParamsListPegawaiLogs,
  clearParamsListPegawaiLogs
} = formSlice.actions;

export default formSlice.reducer;
