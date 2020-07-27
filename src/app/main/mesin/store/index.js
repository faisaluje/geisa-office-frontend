import { combineReducers } from '@reduxjs/toolkit';
import table from './tableSlice';
import form from './formSlice';
import users from './usersSlice';
import logs from './logsSlice';

const reducer = combineReducers({
	table,
	form,
	users,
	logs
});

export default reducer;
