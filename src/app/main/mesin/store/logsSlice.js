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

export const refreshListLogs = () => (dispatch, getState) => {
	const { sn } = getState().mesin.form.data;
	dispatch(getListLogs(sn));
};

const initialState = {
	table: null,
	isLoading: false,
	isError: false,
	msg: '',
	params: { page: 1 }
};

const logsSlice = createSlice({
	name: 'logs',
	initialState,
	reducers: {
		setParamsListLogs: (state, action) => {
			state.params = action.payload;
		}
	},
	extraReducers: {
		[getListLogs.pending]: state => {
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

export const { setParamsListLogs } = logsSlice.actions;

export default logsSlice.reducer;
