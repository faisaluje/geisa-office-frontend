import { combineReducers } from 'redux';
import table from './tableSlice';
import form from './formSlice';

const reducer = combineReducers({
	table,
	form
});

export default reducer;
