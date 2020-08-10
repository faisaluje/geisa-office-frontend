import React from 'react';
import { Button, Icon, IconButton, MenuItem, TextField, Tooltip, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { refreshListPengguna, setParamsListPengguna } from './store/tableSlice';
import { openPenggunaDialog } from './store/formSlice';

function PenggunaToolbar() {
  const dispatch = useDispatch();
  const { params } = useSelector(({ pengguna }) => pengguna.table);
  const [pencarian, setPencarian] = React.useState(params?.nama || '');

  const submitPencarian = e => {
    if (e.key === 'Enter') {
      dispatch(setParamsListPengguna({ ...params, nama: pencarian }));
    }
  };

  return (
    <div className="m-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <Typography className="mr-8">Cari : </Typography>
        <TextField
          size="small"
          placeholder="Ketik Disini..."
          value={pencarian}
          onChange={evt => setPencarian(evt.target.value)}
          InputProps={{
            endAdornment: (
              <Tooltip arrow title="Klik untuk mencari" classes={{ tooltip: 'text-14' }}>
                <IconButton
                  size="small"
                  onClick={() => dispatch(setParamsListPengguna({ ...params, nama: pencarian }))}
                >
                  <Icon>search</Icon>
                </IconButton>
              </Tooltip>
            )
          }}
          onKeyPress={submitPencarian}
        />

        <Button
          size="small"
          color="primary"
          variant="contained"
          startIcon={<Icon>refresh</Icon>}
          className="ml-24"
          onClick={() => dispatch(refreshListPengguna())}
        >
          Refresh
        </Button>
      </div>

      <div className="flex flex-wrap items-center">
        <TextField
          select
          size="small"
          style={{ width: '12rem' }}
          color="secondary"
          label="Status Pengguna"
          value={params?.status || 'aktif'}
          onChange={event => dispatch(setParamsListPengguna({ ...params, status: event.target.value }))}
        >
          <MenuItem value="aktif">Aktif</MenuItem>
          <MenuItem value="tidak_aktif">Tidak Aktif</MenuItem>
        </TextField>

        <Button
          className="ml-0 sm:ml-12"
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>add</Icon>}
          onClick={() => dispatch(openPenggunaDialog())}
        >
          Tambah Pengguna
        </Button>
      </div>
    </div>
  );
}

export default PenggunaToolbar;
