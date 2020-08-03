import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PegawaiService from '../services/pegawai.service';

export const getListPegawai = createAsyncThunk('pegawai/getListPegawai', async (_id, { getState }) => {
	const { params } = getState().pegawai.table;
	const pegawais = await PegawaiService.getListPegawaiData(params);
	if (!pegawais.success) {
		throw new Error(pegawais.msg);
	}

	return pegawais.data;
});

export const refreshListPegawai = () => dispatch => {
	dispatch(getListPegawai());
};

const initialState = {
	data: null,
	isLoading: true,
	isError: false,
	msg: '',
	params: { page: 1 }
};

const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setParamsListPegawai: (state, action) => {
			state.params = action.payload;
		}
	},
	extraReducers: {
		[getListPegawai.pending]: state => {
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

export const { setParamsListPegawai } = tableSlice.actions;

export default tableSlice.reducer;
