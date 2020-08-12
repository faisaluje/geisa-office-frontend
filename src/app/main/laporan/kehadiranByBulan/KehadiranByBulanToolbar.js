import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Icon, MenuItem, TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { getFirstDateOfMonth, getLastDateOfMonth } from 'app/Utils';
import DivisiService from 'app/main/pegawai/services/divisi.service';
import { refreshListKehadiranByBulan, setParamsListKehadiranByBulan } from '../store/kehadiranByBulanSlice';

function KehadiranByBulanToolbar() {
  const dispatch = useDispatch();
  const { params, isLoading } = useSelector(({ laporan }) => laporan.kehadiranByBulan);
  const [listDivisi, setListDivisi] = React.useState([]);
  const [isLoadingDivisi, setIsLoadingDivisi] = React.useState(true);

  React.useEffect(() => {
    setIsLoadingDivisi(true);
    DivisiService.getListDivisiByPegawai()
      .then(result => {
        setListDivisi(result.data);
      })
      .finally(() => setIsLoadingDivisi(false));
  }, []);

  const onPrint = () => {
    window.print();
  };

  return (
    <div className="sticky top-0 bg-white shadow-3 p-24 m-0 w-full flex flex-wrap justify-between print:hidden">
      <div className="flex flex-wrap items-center">
        {isLoadingDivisi ? (
          <CircularProgress />
        ) : (
          <TextField
            select
            id="divisi-laporan"
            variant="outlined"
            className="sm:mr-12"
            style={{ width: '20rem' }}
            size="small"
            label="Divisi"
            value={params?.divisi || ''}
            onChange={event => dispatch(setParamsListKehadiranByBulan({ ...params, divisi: event.target.value }))}
          >
            <MenuItem value="">-- SEMUA --</MenuItem>
            {listDivisi?.map(divisi => (
              <MenuItem key={divisi.id} value={divisi.id}>
                {divisi.nama}
              </MenuItem>
            ))}
          </TextField>
        )}

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
              setParamsListKehadiranByBulan({
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
          disabled={isLoading}
          color="primary"
          startIcon={<Icon>refresh</Icon>}
          onClick={() => dispatch(refreshListKehadiranByBulan())}
        >
          Refresh
        </Button>
      </div>

      <div className="flex flex-wrap items-center">
        <Button
          disabled={isLoading}
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>print</Icon>}
          onClick={onPrint}
        >
          Cetak
        </Button>
      </div>
    </div>
  );
}

export default KehadiranByBulanToolbar;
