import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/id';
import { startCase } from 'lodash';

moment.locale('id');

function MesinForm() {
  const { data } = useSelector(({ mesin }) => mesin.form);

  if (!data) {
    return (
      <div className="m-16 justify-center text-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <FuseAnimateGroup
        enter={{
          animation: 'transition.perspectiveDownIn',
          delay: 200
        }}
        className="flex flex-col overflow-auto"
      >
        <div className="flex mb-12 items-center">
          <Typography className="min-w-136 font-bold">Serial Number:</Typography>

          <Typography>{data.sn}</Typography>
        </div>

        <div className="flex mb-12 items-center">
          <Typography className="min-w-136 font-bold">Tipe:</Typography>

          <Typography>{data.nama}</Typography>
        </div>

        <div className="flex mb-12 items-center">
          <Typography className="min-w-136 font-bold">Vendor:</Typography>

          <Typography>{data.vendor}</Typography>
        </div>

        <div className="flex mb-12 items-center">
          <Typography className="min-w-136 font-bold">Tgl Registrasi:</Typography>

          <Typography>{data.tglRegistrasi ? moment(data.tglRegistrasi).format('D MMMM YYYY') : '-'}</Typography>
        </div>

        <div className="flex mb-12 items-center">
          <Typography className="min-w-136 font-bold">Status:</Typography>

          <Typography>
            {data.connectedMesin?.updatedStatusAt
              ? `${startCase(data.connectedMesin.status)} dari ${moment(data.connectedMesin.updatedStatusAt)
                  .add(7, 'h')
                  .fromNow()}`
              : '-'}
          </Typography>
        </div>
      </FuseAnimateGroup>
    </div>
  );
}

export default MesinForm;
