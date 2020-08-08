import { combineReducers } from 'redux';
import form from './formSlice';
import password from './passwordSlice';

const reducer = combineReducers({
  form,
  password
});

export default reducer;
