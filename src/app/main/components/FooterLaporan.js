import React from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment';

function FooterLaporan() {
  return (
    <div className="hidden print:flex fixed bottom-0 left-0 justify-between items-center w-full print:pt-12">
      <div className="flex flex-1 flex-row items-center">
        <Typography className="font-light italic text-10">Dicetak oleh </Typography>
        <img width="48" className="mx-12" src="assets/images/logos/geisa.svg" alt="logo-geisa" />
        <Typography className="font-light italic text-10">
          pada {moment().format('dddd, D MMMM YYYY HH:mm:ss')}
        </Typography>
      </div>

      <div className="flex flex-col">
        <Typography className="font-light italic text-10">https://office.opstore.id</Typography>
      </div>
    </div>
  );
}

export default FooterLaporan;
