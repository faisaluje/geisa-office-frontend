import React, { forwardRef } from 'react';
import { Dialog, Toolbar, Typography, IconButton, Icon, DialogContent, Slide, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import withReducer from 'app/store/withReducer';
import History from '@history';
import { closeTentangDialog } from './store/tentangSlice';
import reducer from './store';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Tentang() {
  const dispatch = useDispatch();
  const store = useSelector(({ bantuan }) => bantuan.tentang);

  function handleClose() {
    History.push('/home');
    dispatch(closeTentangDialog());
  }

  return (
    <Dialog
      classes={{ paper: 'rounded-8 w-full' }}
      TransitionComponent={Transition}
      {...store.props}
      onClose={() => handleClose()}
      fullWidth
    >
      <Toolbar className="flex flex-row items-center justify-between w-full">
        <Typography variant="h6" color="inherit">
          Tentang Aplikasi
        </Typography>

        <div className="flex flex-row -mr-24">
          <IconButton color="inherit" onClick={() => handleClose()}>
            <Icon className="text-28">close</Icon>
          </IconButton>
        </div>
      </Toolbar>

      <DialogContent classes={{ root: 'p-24' }}>
        <FuseAnimateGroup
          enter={{
            animation: 'transition.bounceUpIn',
            duration: 500,
            delay: 200
          }}
        >
          <img
            className="w-256 mx-auto flex items-center justify-center"
            src="assets/images/logos/geisa.svg"
            alt="logo"
          />

          <Paper
            style={{ width: 'fit-content' }}
            className="rounded-8 mx-auto mt-8 px-6 py-4 flex items-center justify-center bg-gray-700 text-white"
          >
            General Equipment and Integration System of Attendance
          </Paper>

          {/* <Typography className="mx-auto flex items-center justify-center mt-12">
            Versi Client : {VERSION_APP}
          </Typography> */}

          <Typography className="mt-24">
            Aplikasi GEISA Office adalah aplikasi komersial dari PT. Geisa Integrasi Persada yang berfungsi untuk
            mengintegrasikan antara mesin pencatat kehadiran elektronik dari suatu lembaga (misalnya sekolah, rumah
            sakit dan instansi lainnya) dengan satu server pengumpul data secara online dan realtime melalui jaringan
            internet. Pada dasaranya Aplikasi GEISA ini digunakan secara umum, karena tidak dikhususkan pada satu
            instansi tertentu.
          </Typography>
        </FuseAnimateGroup>
      </DialogContent>
    </Dialog>
  );
}

export default withReducer('bantuan', reducer)(Tentang);
