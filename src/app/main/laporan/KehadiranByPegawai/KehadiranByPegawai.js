import History from '@history';
import {
  AppBar,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Slide,
  Toolbar,
  Typography
} from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from '../store';
import { closeKehadiranByPegawaigDialog, getListKehadiranByPegawai } from '../store/kehadiranByPegawaiSlice';
import KehadiranByPegawaiContent from './KehadiranByPegawaiContent';
import KehadiranByPegawaiToolbar from './KehadiranByPegawaiToolbar';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function KehadiranByPegawai() {
  const dispatch = useDispatch();
  const { props, isLoading, params, isRefresh } = useSelector(({ laporan }) => laporan.kehadiranByPegawai);

  React.useEffect(() => {
    if (params?.pegawai && isRefresh) {
      dispatch(getListKehadiranByPegawai());
    }
  }, [dispatch, isRefresh, params]);

  const handleClose = () => {
    History.push('/home');
    dispatch(closeKehadiranByPegawaigDialog());
  };

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      onClose={handleClose}
      fullScreen
      fullWidth
      hideBackdrop
      className="print:m-0 print:m-0"
    >
      <DialogTitle className="p-0 print:hidden">
        <AppBar className="relative">
          <Toolbar>
            <div className="flex flex-row flex-1 items-center">
              <Typography variant="h6">Laporan Kehadiran by Pegawai</Typography>
            </div>

            <IconButton disabled={isLoading} color="inherit" onClick={handleClose}>
              <Icon>close</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </DialogTitle>

      <DialogContent className="flex flex-col w-full m-0 print:p-0 print:m-0">
        {isLoading ? (
          <div className="flex flex-col justify-center text-center items-center h-full">
            <CircularProgress />
            <Typography className="mt-8">Tunggu sebentar. . .</Typography>
          </div>
        ) : (
          <>
            <KehadiranByPegawaiToolbar />
            <KehadiranByPegawaiContent />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default withReducer('laporan', reducer)(KehadiranByPegawai);
