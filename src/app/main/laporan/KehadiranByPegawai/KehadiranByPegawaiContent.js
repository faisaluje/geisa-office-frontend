import { Paper, Typography } from '@material-ui/core';
import FooterLaporan from 'app/main/components/FooterLaporan';
import HeaderLaporan from 'app/main/components/HeaderLaporan';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

function KehadiranByPegawaiContent() {
  const { data, params } = useSelector(({ laporan }) => laporan.kehadiranByPegawai);

  if (!params?.pegawai || !data) {
    return (
      <div className="flex flex-col justify-center text-center items-center h-full">
        <Typography className="mt-8">Belum ada data. . .</Typography>
      </div>
    );
  }

  return (
    <Paper
      elevation={3}
      className="flex flex-col flex-auto w-xl mx-auto print:bg-white print:w-full print:h-full mt-24 print:m-0 print:shadow-none p-24 print:p-0"
    >
      <HeaderLaporan title={`Kehadiran Pegawai Bulan ${moment(params.tglAwal).format('MMMM YYYY')}`} />

      <div className="my-12" />

      <div className="flex flex-col">
        <div className="flex">
          <Typography className="w-160 min-w-160">Nama Pegawai</Typography>
          <Typography>: {params.pegawai.nama}</Typography>
        </div>

        <div className="flex mt-12">
          <Typography className="w-160 min-w-160">NIP</Typography>
          <Typography>: {params.pegawai.nip}</Typography>
        </div>

        <div className="flex mt-12">
          <Typography className="w-160 min-w-160">Divisi</Typography>
          <Typography>: {params.pegawai.divisi?.nama || '-'}</Typography>
        </div>

        <div className="flex mt-12">
          <Typography className="w-160 min-w-160">Jabatan</Typography>
          <Typography>: {params.pegawai.jabatan?.nama || '-'}</Typography>
        </div>
      </div>

      <table className="border-collapse border-black border mt-12">
        <thead>
          <tr>
            <th className="p-4 border w-80">Tanggal</th>
            <th className="p-4 border">Masuk</th>
            <th className="p-4 border">Pulang</th>
          </tr>
        </thead>

        <tbody>
          {[...Array(moment(params.tglAkhir).date())].map((_val, idx) => {
            const kehadiran = data ? data.find(row => row.tgl === idx + 1) : undefined;

            return (
              <tr key={idx}>
                <td className="p-4 border-r border-l border-black" align="center">
                  {idx + 1}
                </td>
                <td className="p-4 border-r border-black" align="center">
                  {kehadiran ? moment(kehadiran.masuk.time).format('HH:mm') : '-'}
                </td>
                <td className="p-4 border-r border-black" align="center">
                  {kehadiran ? moment(kehadiran.pulang.time).format('HH:mm') : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <FooterLaporan />
    </Paper>
  );
}

export default KehadiranByPegawaiContent;
