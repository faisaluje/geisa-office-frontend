import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import UsersService from '../services/users.service';

export const getListUsers = createAsyncThunk('mesin/users/getListsUsers', async (id, { getState }) => {
	const { params } = getState().mesin.users;
	const response = await UsersService.getListUsersData(id, params);
	if (!response.success) {
		throw new Error(response.msg);
	}

	return response.data;
});

export const refreshListUsers = () => (dispatch, getState) => {
	const mesinId = getState().mesin.form.data.id;
	dispatch(getListUsers(mesinId));
};

const initialState = {
	table: null,
	data: null,
	props: { open: false },
	isLoading: false,
	isError: false,
	msg: '',
	params: { page: 1, limit: 3 }
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setParamsListUsers: (state, action) => {
			state.params = action.payload;
		}
	},
	extraReducers: {
		[getListUsers.pending]: state => {
			state.isLoading = true;
			state.isError = false;
			state.msg = '';
		},
		[getListUsers.fulfilled]: (state, action) => {
			state.table = action.payload;
			state.isLoading = false;
		},
		[getListUsers.rejected]: (state, action) => {
			state.isError = true;
			state.msg = action.error.message || 'something wrong';
			state.isLoading = false;
		}
	}
});

export const { setParamsListUsers } = usersSlice.actions;

export default usersSlice.reducer;
