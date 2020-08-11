import React from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment';

function FooterLaporan() {
  return (
    <div className="hidden print:block fixed bottom-0 left-0 flex justify-between">
      <div className="flex flex-row items-center">
        <Typography className="font-light italic text-12">Dicetak oleh </Typography>
        <img width="64" className="mx-12" src="assets/images/logos/geisa.svg" alt="logo-geisa" />
        <Typography className="font-light italic text-12">
          pada {moment().format('dddd, D MMMM YYYY HH:mm:ss')}
        </Typography>
      </div>
    </div>
  );
}

export default FooterLaporan;
