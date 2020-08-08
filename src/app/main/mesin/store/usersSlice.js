import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import UsersService from '../services/users.service';

export const getListUsers = createAsyncThunk('mesin/users/getListUsers', async (mesinId, { getState }) => {
  const { params } = getState().mesin.users;
  const response = await UsersService.getListUsersData(mesinId, params);
  if (!response.success) {
    throw new Error(response.msg);
  }

  return response.data;
});

export const saveUser = createAsyncThunk('mesin/users/saveUser', async data => {
  let result = { success: false };
  if (!data.id) {
    result = await UsersService.createUser(data);
  } else {
    const { id } = data;
    delete data.id;
    result = await UsersService.updateUser(id, data);
  }

  if (!result.success) {
    throw new Error(result.msg);
  }

  return result.data;
});

const initialState = {
  table: null,
  form: {
    data: null,
    props: { open: false },
    isLoading: false,
    isError: false,
    msg: ''
  },
  data: null,
  props: { open: false },
  isLoading: false,
  isError: false,
  isRefresh: true,
  msg: '',
  params: { page: 1 }
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    refreshListUsers: state => {
      state.isRefresh = true;
    },
    setParamsListUsers: (state, action) => {
      state.params = action.payload;
      state.isRefresh = true;
    },
    exitListUsers: state => {
      state.params = { page: 1 };
      state.isRefresh = true;
    },
    setUserForm: (state, action) => {
      state.form.data = action.payload;
    },
    openUserDialog: state => {
      state.form.props.open = true;
    },
    closeUserDialog: state => {
      state.form.props.open = false;
      state.form.isError = false;
      state.form.msg = '';
      state.form.data = null;
    }
  },
  extraReducers: {
    [getListUsers.pending]: state => {
      state.isRefresh = false;
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
    },
    [saveUser.pending]: state => {
      state.form.isLoading = true;
      state.form.isError = false;
      state.form.msg = '';
    },
    [saveUser.fulfilled]: (state, action) => {
      state.form.msg = action.payload;
      state.form.isLoading = false;
      state.isRefresh = true;
    },
    [saveUser.rejected]: (state, action) => {
      state.form.isError = true;
      state.form.msg = action.error.message || 'something wrong';
      state.form.isLoading = false;
    }
  }
});

export const {
  setParamsListUsers,
  setUserForm,
  openUserDialog,
  closeUserDialog,
  refreshListUsers,
  exitListUsers
} = usersSlice.actions;

export default usersSlice.reducer;
