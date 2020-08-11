import { CircularProgress, Typography } from '@material-ui/core';
import { URL_BACKEND } from 'app/constants';
import React from 'react';
import { useSelector } from 'react-redux';

function HeaderLaporan({ title }) {
  const { instansi } = useSelector(({ auth }) => auth.user.data);
  const { data } = useSelector(({ info }) => info.instansi);

  if (!data) {
    return (
      <div className="flex flex-col justify-center text-center items-center h-full">
        <CircularProgress />
        <Typography className="mt-8">Tunggu sebentar. . .</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-row border-black border-b pb-16">
      <div className="flex items-center justify-center">
        <img className="w-96" src={`${URL_BACKEND}/logos/${instansi}.jpg?${new Date().getTime()}`} alt="logo" />
      </div>

      <div className="flex flex-1 flex-col items-center ml-32">
        <Typography className="font-light" variant="h5">
          {title}
        </Typography>

        <Typography className="font-light" variant="h6">
          {data.nama}
        </Typography>

        <Typography className="font-light" variant="subtitle1">
          {data.alamat}
        </Typography>
      </div>
    </div>
  );
}

export default HeaderLaporan;
