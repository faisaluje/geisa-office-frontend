import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import InstansiService from '../services/instansi.service';

export const getInstansi = createAsyncThunk('instansi/getInstansi', async () => {
	const response = await InstansiService.getInstansiData();
	if (!response.success) {
		throw new Error(response.msg);
	}

	return response.data;
});

const initialState = {
	data: null,
	isLoading: false,
	isError: false,
	msg: ''
};

const instansiSlice = createSlice({
	name: 'instansi',
	initialState,
	reducers: {},
	extraReducers: {
		[getInstansi.pending]: (state, action) => {
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
		}
	}
});

export default instansiSlice.reducer;
