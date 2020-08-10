import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  props: { open: false }
};

const tentangSlice = createSlice({
  name: 'tentang',
  initialState,
  reducers: {
    openTentangDialog: state => {
      state.props.open = true;
    },
    closeTentangDialog: state => {
      state.props.open = false;
    }
  }
});

export const { openTentangDialog, closeTentangDialog } = tentangSlice.actions;

export default tentangSlice.reducer;
