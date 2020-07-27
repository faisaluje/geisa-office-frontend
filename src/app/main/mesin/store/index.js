import { combineReducers } from '@reduxjs/toolkit';
import table from './tableSlice';
import form from './formSlice';
import users from './usersSlice';

const reducer = combineReducers({
	table,
	form,
	users
});

export default reducer;
