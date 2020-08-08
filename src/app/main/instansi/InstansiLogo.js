import { CircularProgress, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { URL_BACKEND, URL_API } from 'app/constants';
import { showMessage } from 'app/store/fuse/messageSlice';
import Axios from 'axios';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  productImageUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut
  }
}));

function InstansiLogo(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { data } = useSelector(({ info }) => info.instansi);
  const [isLoading, setIsLoading] = React.useState(false);

  const showFuseMessage = (message, variant) =>
    showMessage({
      message, // text or html
      autoHideDuration: 6000, // ms
      anchorOrigin: {
        vertical: 'top', // top bottom
        horizontal: 'center' // left center right
      },
      variant // success error info warning null
    });

  const handleUploadChange = e => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > 2e6) {
      dispatch(showFuseMessage('Ukuran file maks 2MB', 'error'));
    } else {
      const formData = new FormData();
      formData.append('logo', file);

      setIsLoading(true);
      Axios.post(`${URL_API}/instansi/logo/${data.id}`, formData, {
        timeout: 60000
      })
        .then(() => {
          dispatch(showFuseMessage('Logo berhasil dirubah', 'success'));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return isLoading ? (
    <div className="flex flex-col justify-center text-center items-center h-full p-16">
      <CircularProgress />
      <Typography className="mt-8">Sedang memproses. . .</Typography>
    </div>
  ) : (
    <Tooltip arrow classes={{ tooltip: 'text-14' }} title="Klik untuk mengganti logo">
      <label
        htmlFor="button-file"
        className={clsx(
          classes.productImageUpload,
          'flex items-center justify-center relative h-128 rounded-4 m-8 overflow-hidden cursor-pointer hover:shadow-5'
        )}
      >
        <input accept="image/*" className="hidden" id="button-file" type="file" onChange={handleUploadChange} />
        <img
          className="max-w-none w-auto h-full px-12"
          src={`${URL_BACKEND}/logos/${data.id}.jpg?${new Date().getTime()}`}
          alt="profile"
          onError={e => {
            e.target.onerror = null;
            e.target.src = `${URL_BACKEND}/logos/no-logo.png`;
          }}
        />
      </label>
    </Tooltip>
  );
}

export default InstansiLogo;
