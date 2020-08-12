import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Card, CardContent, Typography, Button, InputAdornment, Icon, CircularProgress } from '@material-ui/core';
import Formsy from 'formsy-react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { TextFieldFormsy } from '@fuse/core/formsy';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { URL_API } from 'app/constants';
import MailConfirmation from './MailConfirmation';

function LupaPassword() {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [btnLabel, setBtnLabel] = React.useState('Kirim Email');
  const formRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  React.useEffect(() => {
    if (msg && !isLoading) {
      const variant = isError ? 'error' : 'success';

      dispatch(
        showMessage({
          message: msg, // text or html
          autoHideDuration: 6000, // ms
          anchorOrigin: {
            vertical: 'top', // top bottom
            horizontal: 'center' // left center right
          },
          variant // success error info warning null
        })
      );

      setBtnLabel('Kirim Email');
    }
  }, [dispatch, isError, isLoading, msg]);

  const disableButton = () => {
    setIsFormValid(false);
  };
  const enableButton = () => {
    setBtnLabel('Kirim Email');
    setIsFormValid(true);
  };

  const handleSubmit = model => {
    setBtnLabel('Tunggu Sebentar');
    setIsLoading(true);
    disableButton();
    setMsg('');
    setIsError(false);
    Axios.post(`${URL_API}/auth/lupa-password`, model, { timeout: 30000 })
      .then(() => {
        setUsername(model.username);
        setMsg('Proses Berhasil');
      })
      .catch(() => {
        setIsError(true);
        setMsg('Gagal memproses');
      })
      .finally(() => setIsLoading(false));
  };

  if (!isLoading && !isError && msg) {
    return <MailConfirmation username={username} />;
  }

  return (
    <div className="flex flex-col flex-auto flex-shrink-0 items-center justify-center w-screen p-32 bg-gray-200">
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384 rounded-12">
            {isLoading ? (
              <div className="flex flex-col justify-center text-center items-center h-full p-24">
                <CircularProgress />
                <Typography className="mt-8">Sedang memproses. . .</Typography>
              </div>
            ) : (
              <CardContent className="flex flex-col items-center justify-center p-32">
                <img className="w-256 m-32" src="assets/images/logos/geisa.svg" alt="logo" />

                <Typography variant="h6" className="mt-16 mb-16">
                  Lupa Password
                </Typography>

                <Formsy
                  onValidSubmit={handleSubmit}
                  onValid={enableButton}
                  onInvalid={disableButton}
                  ref={formRef}
                  name="loginForm"
                  className="flex flex-col justify-center w-full items-center"
                >
                  <FuseAnimateGroup
                    enter={{
                      animation: 'transition.bounceUpIn',
                      duration: 400,
                      delay: 400
                    }}
                    className="text-center"
                  >
                    <TextFieldFormsy
                      className="mb-16"
                      label="Username"
                      autoFocus
                      name="username"
                      validations="isEmail"
                      validationError="username tidak valid"
                      variant="outlined"
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className="text-20" color="action">
                              email
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                      fullWidth
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      className="w-224 mx-auto mt-16"
                      aria-label="LOG IN"
                      disabled={!isFormValid}
                      type="submit"
                    >
                      {btnLabel}
                    </Button>
                  </FuseAnimateGroup>
                </Formsy>

                <div className="flex flex-col items-center justify-center pt-32">
                  <Link className="font-medium" to="/login">
                    Kembali ke Halaman Login
                  </Link>
                </div>
              </CardContent>
            )}
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default LupaPassword;
