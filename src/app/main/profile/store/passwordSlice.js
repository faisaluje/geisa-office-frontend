import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PenggunaService from 'app/main/pengaturan/pengguna/services/pengguna.service';

export const savePassword = createAsyncThunk('password/save', async ({ id, data }) => {
  const result = await PenggunaService.updatePassword(id, data);

  if (!result.success) {
    throw new Error(result.msg);
  }

  return result.data;
});

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  msg: '',
  props: { open: false }
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPasswordForm: (state, action) => {
      state.data = action.payload;
    },
    openPasswordDialog: state => {
      state.props.open = true;
    },
    closePasswordDialog: state => {
      state.props.open = false;
      state.isError = false;
      state.msg = '';
      state.data = null;
    }
  },
  extraReducers: {
    [savePassword.pending]: state => {
      state.isLoading = true;
      state.isError = false;
      state.msg = '';
    },
    [savePassword.fulfilled]: (state, action) => {
      state.msg = action.payload;
      state.isLoading = false;
    },
    [savePassword.rejected]: (state, action) => {
      console.log(action.error);
      state.isError = true;
      state.msg = action.error.message || 'something wrong';
      state.isLoading = false;
    }
  }
});

export const { setPasswordForm, openPasswordDialog, closePasswordDialog } = passwordSlice.actions;

export default passwordSlice.reducer;
