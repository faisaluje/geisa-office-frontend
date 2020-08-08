import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@material-ui/core';
import React from 'react';
import { startCase } from 'lodash';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { useDispatch, useSelector } from 'react-redux';
import GreenSwitch from '../components/GreenSwitch';
import { updateStatusPengguna } from './store/tableSlice';
import { openPenggunaDialog, setPenggunaForm } from './store/formSlice';

function PenggunaTable() {
  const dispatch = useDispatch();
  const { data } = useSelector(({ pengguna }) => pengguna.table);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (data?.items) {
      setRows(data.items);
    }
  }, [data]);

  const onClickPengguna = pengguna => {
    dispatch(setPenggunaForm(pengguna));
    dispatch(openPenggunaDialog());
  };

  const handleChangeStatus = pengguna => {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Pengguna {pengguna.nama} akan di
                {pengguna.status === 'aktif' ? ' nonaktifkan' : ' aktifkan'} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
              <Button onClick={() => onChangeStatus(pengguna)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </>
        )
      })
    );
  };

  const onChangeStatus = pengguna => {
    dispatch(
      updateStatusPengguna({
        ...pengguna,
        status: pengguna.status === 'aktif' ? 'tidak_aktif' : 'aktif'
      })
    );
    dispatch(closeDialog());
  };

  return (
    <TableContainer component={Paper} elevation={3} className="my-12">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '5rem' }}>No.</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Nama Pengguna</TableCell>
            <TableCell>No. HP</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows?.length > 0 ? (
            rows.map((pengguna, idx) => (
              <TableRow key={pengguna.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Tooltip arrow classes={{ tooltip: 'text-14' }} title="Klik untuk melihat detil Pengguna">
                    <Typography
                      className="text-blue hover:underline"
                      role="button"
                      onClick={() => onClickPengguna(pengguna)}
                      color="inherit"
                    >
                      {pengguna.username}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>{pengguna.nama}</TableCell>
                <TableCell>{pengguna.noHp}</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <GreenSwitch
                        checked={pengguna.status === 'aktif'}
                        onChange={() => handleChangeStatus(pengguna)}
                      />
                    }
                    label={startCase(pengguna?.status || 'Aktif')}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Belum ada Pengguna. . .
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PenggunaTable;
