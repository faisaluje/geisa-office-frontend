import { TextFieldFormsy } from '@fuse/core/formsy';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  InputAdornment,
  Paper,
  Typography
} from '@material-ui/core';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import Formsy from 'formsy-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileForm } from '../profile/store/formSlice';
import { closePenggunaDialog, savePengguna, setPenggunaForm } from './store/formSlice';

function PenggunaForm() {
  const dispatch = useDispatch();
  const { data, isLoading, isError, msg } = useSelector(({ pengguna }) => pengguna.form);
  const formRef = React.useRef(null);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

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
      dispatch(closePenggunaDialog());
      dispatch(setProfileForm(null));
    }
  }, [dispatch, isError, isLoading, msg]);

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
    dispatch(setPenggunaForm(form));
    dispatch(savePengguna({ ...form }));
    dispatch(closeDialog());
  };

  return (
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

          {!data?.id && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Username:</Typography>

              <TextFieldFormsy
                name="username"
                value={data?.username || ''}
                fullWidth
                validations="isEmail"
                validationError="username harus email"
                required
              />
            </div>
          )}

          {!data?.id && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Password:</Typography>

              <TextFieldFormsy
                name="password"
                value={data?.password || ''}
                fullWidth
                validations="minLength:4"
                validationErrors={{
                  minLength: 'Minimal 4 karakter',
                  isDefaultRequiredValue: 'Password tidak boleh kosong'
                }}
                required
                InputProps={{
                  className: 'pr-2',
                  type: showPassword ? 'text' : 'password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        <Icon className="text-20" color="action">
                          {showPassword ? 'visibility' : 'visibility_off'}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
          )}

          {!data?.id && (
            <div className="flex mb-16">
              <Typography className="min-w-160 font-bold pt-12">Konfirmasi Password:</Typography>

              <TextFieldFormsy
                type="password"
                name="retypePassword"
                value={data?.retypePassword || ''}
                fullWidth
                validations="equalsField:password"
                validationError="Konfirmasi Password tidak sesuai"
                required
              />
            </div>
          )}

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
  );
}

export default PenggunaForm;
