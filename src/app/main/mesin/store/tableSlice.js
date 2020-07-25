const { createSlice } = require('@reduxjs/toolkit');

export const getListMesin = () => (dispatch, getState) => {
	const instansi = getState().info.instansi?.data;
	if (instansi) {
		dispatch(setData(instansi.mesins));
	}
};

const initialState = {
	data: null,
	isLoading: false,
	isError: false,
	msg: ''
};

const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setData: (state, action) => {
			state.data = action.payload;
		}
	},
	extraReducers: {}
});

export const { setData } = tableSlice.actions;

export default tableSlice.reducer;
