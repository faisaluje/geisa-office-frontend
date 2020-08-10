import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { getFirstDateOfMonth, getLastDateOfMonth } from 'app/Utils';
import PegawaiAutoComplete from 'app/main/components/PegawaiAutoComplete';
import { refreshListKehadiranByPegawai, setParamsListKehadiranByPegawai } from '../store/kehadiranByPegawaiSlice';

function KehadiranByPegawaiToolbar() {
  const dispatch = useDispatch();
  const { params } = useSelector(({ laporan }) => laporan.kehadiranByPegawai);

  const onPrint = () => {
    window.print();
  };

  return (
    <div className="sticky top-0 bg-white shadow-3 p-24 m-0 w-full flex flex-wrap justify-between print:hidden">
      <div className="flex flex-wrap items-center">
        <PegawaiAutoComplete
          size="small"
          variant="outlined"
          label="Pegawai"
          className="min-w-384"
          value={params?.pegawai || null}
          onChange={(_e, val) => dispatch(setParamsListKehadiranByPegawai({ ...params, pegawai: val }))}
        />

        <DatePicker
          inputVariant="outlined"
          views={['year', 'month']}
          size="small"
          openTo="month"
          label="Bulan Kehadiran"
          value={params?.tglAwal || getFirstDateOfMonth()}
          className="w-128 mx-0 sm:mx-24"
          onChange={val =>
            dispatch(
              setParamsListKehadiranByPegawai({
                ...params,
                tglAwal: getFirstDateOfMonth({ date: val.toDate() }),
                tglAkhir: getLastDateOfMonth({ date: val.toDate() })
              })
            )
          }
        />

        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>refresh</Icon>}
          onClick={() => dispatch(refreshListKehadiranByPegawai())}
        >
          Refresh
        </Button>
      </div>

      <div className="flex flex-wrap items-center">
        <Button size="small" variant="contained" color="primary" startIcon={<Icon>print</Icon>} onClick={onPrint}>
          Cetak
        </Button>
      </div>
    </div>
  );
}

export default KehadiranByPegawaiToolbar;
