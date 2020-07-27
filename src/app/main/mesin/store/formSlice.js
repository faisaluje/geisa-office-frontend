import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: null,
	props: { open: false }
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setMesinFormData: (state, action) => {
			state.data = action.payload;
		},
		openMesinDialog: state => {
			state.props = { open: true };
		},
		closeMesinDialog: state => {
			state.props = { open: false };
			state.data = null;
		}
	},
	extraReducers: {}
});

export const { setMesinFormData, openMesinDialog, closeMesinDialog } = formSlice.actions;

export default formSlice.reducer;
