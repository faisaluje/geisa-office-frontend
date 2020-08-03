import { combineReducers } from '@reduxjs/toolkit';
import table from './tableSlice';
import form from './formSlice';

const reducer = combineReducers({
	table,
	form
});

export default reducer;
