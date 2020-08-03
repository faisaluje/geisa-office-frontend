import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
		}
	}
});

export const { setPegawaiForm, openPegawaiDialog, closePegawaiDialog } = formSlice.actions;

export default formSlice.reducer;
