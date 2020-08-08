import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PenggunaService from '../services/pengguna.service';
import { refreshListPengguna } from './tableSlice';

export const savePengguna = createAsyncThunk('pengguna/save', async (data, { dispatch }) => {
	let result = { success: false };
	if (!data.id) {
		result = await PenggunaService.createPengguna(data);
	} else {
		const { id } = data;
		delete data.id;
		result = await PenggunaService.updatePengguna(id, data);
	}

	if (!result.success) {
		throw new Error(result.msg);
	}

	dispatch(refreshListPengguna());
	return result.data;
});

const initialState = {
	data: null,
	isLoading: false,
	isError: false,
	msg: '',
	props: { open: false }
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setPenggunaForm: (state, action) => {
			state.data = action.payload;
		},
		openPenggunaDialog: state => {
			state.props.open = true;
		},
		closePenggunaDialog: state => {
			state.props.open = false;
			state.isError = false;
			state.msg = '';
			state.data = null;
		}
	},
	extraReducers: {
		[savePengguna.pending]: state => {
			state.isLoading = true;
			state.isError = false;
			state.msg = '';
		},
		[savePengguna.fulfilled]: (state, action) => {
			state.msg = action.payload;
			state.isLoading = false;
		},
		[savePengguna.rejected]: (state, action) => {
			state.isError = true;
			state.msg = action.error.message || 'something wrong';
			state.isLoading = false;
		}
	}
});

export const { setPenggunaForm, openPenggunaDialog, closePenggunaDialog } = formSlice.actions;

export default formSlice.reducer;
