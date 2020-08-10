import React from 'react';
import { useDispatch } from 'react-redux';
import History from '@history';
import Instansi from '../instansi/Instansi';
import Mesin from '../mesin/Mesin';
import Pegawai from '../pegawai/Pegawai';
import Pengguna from '../pengaturan/pengguna/Pengguna';
import { openListPenggunaDialog } from '../pengaturan/pengguna/store/tableSlice';
import Profile from '../profile/Profile';
import ChangePassword from '../profile/ChangePassword';
import { openTentangDialog } from '../bantuan/store/tentangSlice';
import Tentang from '../bantuan/Tentang';
import KehadiranByPegawai from '../laporan/KehadiranByPegawai/KehadiranByPegawai';
import { openKehadiranByPegawaigDialog } from '../laporan/store/kehadiranByPegawaiSlice';

function Dashboard(props) {
  const dispatch = useDispatch();
  const { params } = props.match;

  // React.useEffect(() => {
  // 	dispatch(getAllPengaturan());
  // }, [dispatch]);
  React.useEffect(() => {
    if (params.menu === 'pengaturan-pengguna') {
      dispatch(openListPenggunaDialog());
    }

    if (params.menu === 'tentang') {
      dispatch(openTentangDialog());
    }

    if (params.menu === 'contact') {
      History.push('/home');
      window.open('https://api.whatsapp.com/send?phone=+6287877991915');
    }

    if (params.menu === 'kehadiran-pegawai') {
      dispatch(openKehadiranByPegawaigDialog());
    }
  }, [dispatch, params.menu, props]);

  return (
    <div className="flex lg:flex-row sm:flex-col flex-col w-screen px-24 pt-12 print:hidden">
      <Pengguna />
      <Profile />
      <ChangePassword />
      <Tentang />
      <KehadiranByPegawai />

      <div className="flex flex-1 flex-col lg:mr-16 lg:w-1/3 w-full" style={{ height: 'calc(100vh - 95px)' }}>
        <Instansi />
        <Mesin />
      </div>

      <div className="flex lg:w-2/3 w-full" style={{ height: 'calc(100vh - 95px)' }}>
        <Pegawai />
      </div>
    </div>
  );
}

export default Dashboard;
