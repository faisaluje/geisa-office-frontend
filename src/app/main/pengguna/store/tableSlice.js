import History from '@history';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PenggunaService from '../services/pengguna.service';

export const getListPengguna = createAsyncThunk('pengguna/getList', async (_id, { getState }) => {
	const { params } = getState().pengguna.table;
	const listPengguna = await PenggunaService.getListPenggunaData(params);
	if (!listPengguna.success) {
		throw new Error(listPengguna.msg);
	}

	return listPengguna.data;
});

export const updateStatusPengguna = createAsyncThunk('pengguna/updateStatus', async (data, { dispatch }) => {
	const { id } = data;
	delete data.id;

	const result = await PenggunaService.updatePengguna(id, data);
	if (!result.success) {
		throw new Error(result.msg);
	}

	dispatch(refreshListPengguna());
});

export const refreshListPengguna = () => dispatch => {
	dispatch(getListPengguna());
};

const initialState = {
	data: null,
	isLoading: false,
	isError: false,
	msg: '',
	params: { page: 1 },
	props: { open: false }
};

const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setParamsListPengguna: (state, action) => {
			state.params = action.payload;
		},
		openListPenggunaDialog: state => {
			state.props.open = true;
		},
		closeListPenggunaDialog: state => {
			state.props.open = false;
			History.push('/home');
		}
	},
	extraReducers: {
		[getListPengguna.pending]: state => {
			state.isLoading = true;
			state.isError = false;
			state.msg = '';
		},
		[getListPengguna.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
		},
		[getListPengguna.rejected]: (state, action) => {
			state.isError = true;
			state.msg = action.error.message || 'something wrong';
			state.isLoading = false;
		},
		[updateStatusPengguna.pending]: state => {
			state.isLoading = true;
			state.isError = false;
			state.msg = '';
		},
		[updateStatusPengguna.rejected]: (state, action) => {
			state.isError = true;
			state.msg = action.error.message || 'something wrong';
			state.isLoading = false;
		}
	}
});

export const { setParamsListPengguna, openListPenggunaDialog, closeListPenggunaDialog } = tableSlice.actions;

export default tableSlice.reducer;
