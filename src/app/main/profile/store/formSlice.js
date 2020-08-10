import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PenggunaService from 'app/main/pengaturan/pengguna/services/pengguna.service';
import { refreshListPengguna } from 'app/main/pengaturan/pengguna/store/tableSlice';

export const getProfile = createAsyncThunk('profile/get', async id => {
  const profile = await PenggunaService.getPenggunaById(id);

  if (!profile.success) {
    throw new Error(profile.msg);
  }

  return profile.data;
});

export const saveProfile = createAsyncThunk('profile/save', async ({ id, data }, { dispatch }) => {
  const result = await PenggunaService.updatePengguna(id, data);

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
    setProfileForm: (state, action) => {
      state.data = action.payload;
    },
    openProfileDialog: state => {
      state.props.open = true;
    },
    closeProfileDialog: state => {
      state.props.open = false;
      state.isError = false;
      state.msg = '';
    },
    exitProfile: state => {
      state.data = '';
    }
  },
  extraReducers: {
    [getProfile.pending]: state => {
      state.isLoading = true;
      state.isError = false;
      state.msg = '';
    },
    [getProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [getProfile.rejected]: (state, action) => {
      state.isError = true;
      state.msg = action.error.message || 'something wrong';
      state.isLoading = false;
    },
    [saveProfile.pending]: state => {
      state.isLoading = true;
      state.isError = false;
      state.msg = '';
    },
    [saveProfile.fulfilled]: (state, action) => {
      state.msg = action.payload;
      state.isLoading = false;
    },
    [saveProfile.rejected]: (state, action) => {
      state.isError = true;
      state.msg = action.error.message || 'something wrong';
      state.isLoading = false;
    }
  }
});

export const { setProfileForm, openProfileDialog, closeProfileDialog, exitProfile } = formSlice.actions;

export default formSlice.reducer;
