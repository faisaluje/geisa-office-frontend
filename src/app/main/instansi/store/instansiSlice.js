import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import InstansiService from '../services/instansi.service';

export const getInstansi = createAsyncThunk('instansi/getInstansi', async () => {
	const response = await InstansiService.getInstansiData();
	if (!response.success) {
		throw new Error(response.msg);
	}

	return response.data;
});

export const saveInstansi = createAsyncThunk('instansi/saveInstansi', async data => {
	const response = await InstansiService.updateInstansi(data.id, data);
	if (!response.success) {
		throw new Error(response.msg);
	}

	return response.data;
});

const initialState = {
	data: null,
	form: {
		data: null,
		props: { open: false },
		isLoading: false,
		isError: false,
		msg: ''
	},
	isLoading: false,
	isError: false,
	msg: ''
};

const instansiSlice = createSlice({
	name: 'instansi',
	initialState,
	reducers: {
		setInstansiForm: (state, action) => {
			state.form.data = action.payload;
		},
		openInstansiDialog: state => {
			state.form.props.open = true;
		},
		closeInstansiDialog: state => {
			state.form.props.open = false;
			state.form.isError = false;
			state.form.msg = '';
		}
	},
	extraReducers: {
		[getInstansi.pending]: state => {
			state.isLoading = true;
			state.isError = false;
			state.msg = '';
		},
		[getInstansi.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
		},
		[getInstansi.rejected]: (state, action) => {
			state.isError = true;
			state.msg = action.error.message || 'something wrong';
			state.isLoading = false;
		},
		[saveInstansi.pending]: state => {
			state.form.isLoading = true;
			state.form.isError = false;
			state.form.msg = '';
		},
		[saveInstansi.fulfilled]: (state, action) => {
			state.form.msg = action.payload;
			state.form.isLoading = false;
		},
		[saveInstansi.rejected]: (state, action) => {
			state.form.isError = true;
			state.form.msg = action.error.message || 'something wrong';
			state.form.isLoading = false;
		}
	}
});

export const { setInstansiForm, closeInstansiDialog, openInstansiDialog } = instansiSlice.actions;

export default instansiSlice.reducer;
