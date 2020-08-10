import { authRoles } from 'app/auth';

const navigationConfig = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    icon: 'home',
    url: '/home',
    exact: false
  },
  {
    id: 'laporan',
    title: 'Laporan',
    type: 'group',
    icon: 'description',
    children: [
      {
        id: 'kehadiran-tanggal',
        title: 'Kehadiran By Tanggal',
        type: 'item',
        icon: 'date_range',
        url: '/kehadiran-tanggal',
        exact: false
      },
      {
        id: 'kehadiran-pegawai',
        title: 'Kehadiran By Pegawai',
        type: 'item',
        icon: 'people',
        url: '/kehadiran-pegawai',
        exact: false
      }
    ]
  },
  {
    id: 'pengaturan',
    title: 'Pengaturan',
    type: 'group',
    icon: 'settings',
    children: [
      {
        id: 'pengguna',
        title: 'Pengguna',
        type: 'item',
        auth: authRoles.admin,
        icon: 'supervisor_account',
        url: '/pengaturan-pengguna',
        exact: false
      }
    ]
  },
  {
    id: 'bantuan',
    title: 'Bantuan',
    type: 'group',
    icon: 'help',
    children: [
      {
        id: 'contact',
        title: 'Hubungi Kami',
        type: 'item',
        icon: 'phone',
        url: '/contact',
        exact: false
      },
      {
        id: 'tentang',
        title: 'tentang',
        type: 'item',
        icon: 'info',
        url: '/tentang',
        exact: false
      }
    ]
  }
];

export default navigationConfig;
