import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LogsService from '../services/logs.service';

export const getListLogs = createAsyncThunk('mesin/logs/getListLogs', async (sn, { getState }) => {
  const { params } = getState().mesin.logs;
  const response = await LogsService.getListLogsData({ ...params, sn });
  if (!response.success) {
    throw new Error(response.msg);
  }

  return response.data;
});

const initialState = {
  table: null,
  isLoading: false,
  isError: false,
  isRefresh: true,
  msg: '',
  params: { page: 1 }
};

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setParamsListLogs: (state, action) => {
      state.params = action.payload;
      state.isRefresh = true;
    },
    refreshListLogs: state => {
      state.isRefresh = true;
    },
    exitListLogs: state => {
      state.params = { page: 1 };
      state.isRefresh = true;
    }
  },
  extraReducers: {
    [getListLogs.pending]: state => {
      state.isRefresh = false;
      state.isLoading = true;
      state.isError = false;
      state.msg = '';
    },
    [getListLogs.fulfilled]: (state, action) => {
      state.table = action.payload;
      state.isLoading = false;
    },
    [getListLogs.rejected]: (state, action) => {
      state.isError = true;
      state.msg = action.error.message || 'something wrong';
      state.isLoading = false;
    }
  }
});

export const { setParamsListLogs, refreshListLogs, exitListLogs } = logsSlice.actions;

export default logsSlice.reducer;
