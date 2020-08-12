import { combineReducers } from 'redux';
import kehadiranByPegawai from './kehadiranByPegawaiSlice';
import kehadiranByBulan from './kehadiranByBulanSlice';

const reducer = combineReducers({
  kehadiranByPegawai,
  kehadiranByBulan
});

export default reducer;
