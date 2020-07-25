import { combineReducers } from '@reduxjs/toolkit';
import table from './tableSlice';

const reducer = combineReducers({
	table
});

export default reducer;
