import { CircularProgress, Paper, Typography } from '@material-ui/core';
import FooterLaporan from 'app/main/components/FooterLaporan';
import HeaderLaporan from 'app/main/components/HeaderLaporan';
import { countBy } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

function KehadiranByBulanContent() {
  const { data, params, isLoading } = useSelector(({ laporan }) => laporan.kehadiranByBulan);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center text-center items-center h-full">
        <CircularProgress />
        <Typography className="mt-8">Tunggu sebentar. . .</Typography>
      </div>
    );
  }

  if (!data) {
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
      <HeaderLaporan
        title="Laporan Kehadiran Pegawai"
        subTitle={`Bulan ${moment(params.tglAwal).format('MMMM YYYY')}`}
      />

      <div className="my-12" />

      <table className="border-collapse border-black border mt-12 border border-b-0">
        <thead>
          <tr>
            <th className="p-10 border text-16">Daftar Pegawai</th>
          </tr>
        </thead>
      </table>
      <table className="border-collapse border-black border border-b-0">
        <thead>
          <tr>
            <th className="p-2 border w-52">No</th>
            <th className="p-2 border">NIP</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Divisi</th>
            <th className="p-2 border">Jabatan</th>
            <th className="p-2 border">Jumlah Kehadiran (Hari)</th>
          </tr>
        </thead>

        <tbody>
          {data.listPegawai?.map((pegawai, idx) => {
            const countKehadiran = countBy(data.listKehadiran, 'pegawaiId');

            return (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="p-2 border-r border-l border-black" align="right">
                  {idx + 1}
                </td>
                <td className="py-2 px-4 border-r border-black">{pegawai.nip}</td>
                <td className="py-2 px-4 border-r border-black">{pegawai.nama}</td>
                <td className="py-2 px-4 border-r border-black">{pegawai.divisi?.nama}</td>
                <td className="py-2 px-4 border-r border-black">{pegawai.jabatan?.nama}</td>
                <td className="py-2 px-4 border-r border-black" align="center">
                  {countKehadiran[pegawai.id] || '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <table className="border-collapse border-black border mt-40 border border-b-0">
        <thead>
          <tr>
            <th className="p-10 border text-16">Daftar Kehadiran</th>
          </tr>
        </thead>
      </table>
      <table className="border-collapse border-black border border-b-0">
        <thead>
          <tr>
            <th className="p-2 border w-52">No</th>
            <th className="p-2 border">NIP</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Masuk</th>
            <th className="p-2 border">Pulang</th>
            <th className="p-2 border">Durasi</th>
          </tr>
        </thead>

        <tbody>
          {[...Array(moment(params.tglAkhir).date())].map((_val, idx) => {
            return (
              <React.Fragment key={idx}>
                <tr>
                  <td colSpan={6} className="font-bold border border-black text-14 p-12">
                    {moment(params.tglAkhir)
                      .date(idx + 1)
                      .format('dddd, D MMMM YYYY')}
                  </td>
                </tr>

                {data.listPegawai?.map((pegawai, idx2) => {
                  const kehadiran = data.listKehadiran?.find(
                    val =>
                      val.pegawaiId === pegawai.id &&
                      moment(params.tglAkhir)
                        .date(idx + 1)
                        .format('YYYY-MM-DD') === moment(val.tgl).format('YYYY-MM-DD')
                  );

                  let durasi = '';
                  if (kehadiran) {
                    const pulang = moment(kehadiran.pulang);
                    const masuk = moment(kehadiran.masuk);
                    const duration = moment.duration(pulang.diff(masuk));
                    if (duration.hours()) {
                      durasi += `${duration.hours()} Jam`;
                    }

                    if (duration.minutes()) {
                      durasi += duration.hours() ? ' ' : '';
                      durasi += `${duration.minutes()} Menit`;
                    }
                  }

                  return (
                    <tr key={pegawai.id} className={idx2 % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                      <td className="p-2 border-r border-l border-black" align="right">
                        {idx2 + 1}
                      </td>
                      <td className="py-2 px-4 border-r border-black">{pegawai.nip}</td>
                      <td className="py-2 px-4 border-r border-black">{pegawai.nama}</td>
                      <td className="py-2 px-4 border-r border-black" align="center">
                        {kehadiran ? moment(kehadiran.masuk).format('HH:mm') : '-'}
                      </td>
                      <td className="py-2 px-4 border-r border-black" align="center">
                        {kehadiran && kehadiran.masuk !== kehadiran.pulang
                          ? moment(kehadiran.pulang).format('HH:mm')
                          : '-'}
                      </td>
                      <td className="py-2 px-4 border-r border-black" align="center">
                        {durasi || '-'}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <FooterLaporan />
    </Paper>
  );
}

export default KehadiranByBulanContent;
