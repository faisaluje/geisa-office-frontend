import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  CircularProgress,
  Typography,
  AppBar,
  Toolbar,
  Icon,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper
} from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { showMessage } from 'app/store/fuse/messageSlice';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import Formsy from 'formsy-react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { TextFieldFormsy } from '@fuse/core/formsy';
import reducer from './store';
import { closeProfileDialog, getProfile, saveProfile, setProfileForm } from './store/formSlice';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const { props, data, isLoading, isError, msg } = useSelector(({ profile }) => profile.form);
  const formRef = React.useRef(null);
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    if (!data) {
      dispatch(getProfile(user.id));
    }
  }, [data, dispatch, user.id]);

  React.useEffect(() => {
    if (!isLoading && !isError && msg) {
      dispatch(
        showMessage({
          message: msg, // text or html
          autoHideDuration: 6000, // ms
          anchorOrigin: {
            vertical: 'top', // top bottom
            horizontal: 'center' // left center right
          },
          variant: 'success' // success error info warning null
        })
      );
      dispatch(closeProfileDialog());
    }
  }, [dispatch, isError, isLoading, msg]);

  const handleClose = () => {
    dispatch(closeProfileDialog());
  };

  const disableButton = () => {
    setIsFormValid(false);
  };
  const enableButton = () => {
    setIsFormValid(true);
  };

  const handleSubmit = values => {
    dispatch(
      openDialog({
        children: (
          <div>
            <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Apakan anda sudah yakin ?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
              <Button onClick={() => onSubmit(values)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </div>
        )
      })
    );
  };

  const onSubmit = values => {
    const form = {
      ...data,
      ...values
    };
    dispatch(setProfileForm(form));
    dispatch(saveProfile({ id: user.id, data: form }));
    dispatch(closeDialog());
  };

  return (
    <Dialog
      classes={{ paper: 'm-24 rounded-8 w-full' }}
      {...props}
      onClose={handleClose}
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
    >
      {isLoading ? (
        <div className="flex flex-col justify-center text-center items-center h-full p-16">
          <CircularProgress />
          <Typography className="mt-8">Sedang memproses. . .</Typography>
        </div>
      ) : (
        <>
          <AppBar position="static" elevation={1} className="flex flex-col">
            <Toolbar className="flex flex-row items-center justify-between w-full">
              <Typography variant="subtitle1" color="inherit">
                Profile Saya
              </Typography>

              <div className="flex flex-row -mr-24">
                <IconButton color="inherit" onClick={handleClose}>
                  <Icon className="text-28">close</Icon>
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>

          <Formsy
            onValidSubmit={handleSubmit}
            onValid={enableButton}
            onInvalid={disableButton}
            ref={formRef}
            className="flex flex-col overflow-auto"
          >
            <DialogContent classes={{ root: 'p-24' }}>
              <FuseAnimateGroup
                enter={{
                  animation: 'transition.whirlIn',
                  delay: 200,
                  duration: 500
                }}
              >
                {isError && (
                  <div className="flex">
                    <Paper className="text-center w-full p-12 bg-red text-white font-bold">{msg}</Paper>
                  </div>
                )}

                <div className="flex mb-16">
                  <Typography className="min-w-160 font-bold pt-12">Nama Lengkap:</Typography>

                  <TextFieldFormsy
                    type="text"
                    name="nama"
                    value={data?.nama || ''}
                    fullWidth
                    validationError="Nama tidak boleh kosong"
                    required
                    autoFocus
                  />
                </div>

                <div className="flex mb-16">
                  <Typography className="min-w-160 font-bold pt-12">No. Handphone:</Typography>

                  <TextFieldFormsy
                    type="text"
                    name="noHp"
                    value={data?.noHp || ''}
                    fullWidth
                    validations="isNumeric"
                    validationError="Harus angka semua"
                  />
                </div>
              </FuseAnimateGroup>
            </DialogContent>

            <DialogActions>
              <Button variant="contained" color="primary" type="submit" disabled={!isFormValid}>
                Simpan
              </Button>
            </DialogActions>
          </Formsy>
        </>
      )}
    </Dialog>
  );
}

export default withReducer('profile', reducer)(Profile);
