import History from '@history';
import {
  AppBar,
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
import { closeKehadiranByBulangDialog, getListKehadiranByBulan } from '../store/kehadiranByBulanSlice';
import KehadiranByBulanToolbar from './KehadiranByBulanToolbar';
import KehadiranByBulanContent from './KehadiranByBulanContent';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function KehadiranByBulan() {
  const dispatch = useDispatch();
  const { props, isLoading, params, isRefresh } = useSelector(({ laporan }) => laporan.kehadiranByBulan);

  React.useEffect(() => {
    if (isRefresh) {
      dispatch(getListKehadiranByBulan());
    }
  }, [dispatch, isRefresh, params]);

  const handleClose = () => {
    History.push('/home');
    dispatch(closeKehadiranByBulangDialog());
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
              <Typography variant="h6">Laporan Kehadiran by Bulan</Typography>
            </div>

            <IconButton disabled={isLoading} color="inherit" onClick={handleClose}>
              <Icon>close</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </DialogTitle>

      <DialogContent className="flex flex-col w-full m-0 print:p-0 print:m-0">
        <KehadiranByBulanToolbar />
        <KehadiranByBulanContent />
      </DialogContent>
    </Dialog>
  );
}

export default withReducer('laporan', reducer)(KehadiranByBulan);
