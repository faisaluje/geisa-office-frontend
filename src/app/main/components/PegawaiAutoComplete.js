import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import Axios from 'axios';
import { URL_API } from 'app/constants';

function PegawaiAutoComplete(props) {
  const [options, setOptions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  function onTextChanged(evt) {
    if (evt.target.value && evt.target.value.toString().trim().length >= 3) {
      setIsLoading(true);

      (async () => {
        const response = await Axios.get(`${URL_API}/pegawai?nama=${evt.target.value}`);

        if (response && response.data) {
          setOptions(response.data.items);
        } else {
          setOptions([]);
        }

        setIsLoading(false);
      })();
    } else {
      setOptions([]);
    }
  }

  return (
    <Autocomplete
      openOnFocus
      freeSolo
      autoHighlight
      options={options}
      loading={isLoading}
      size={props.size}
      className={props.className}
      disabled={props.disabled || false}
      onChange={props.onChange}
      value={props.value}
      noOptionsText="Pegawai tidak ditemukan"
      getOptionSelected={pegawai => `${pegawai.nip} - ${pegawai.nama}`}
      getOptionLabel={pegawai => `${pegawai.nip} - ${pegawai.nama}`}
      renderInput={params => (
        <TextField
          {...params}
          variant={props.variant}
          onChange={onTextChanged}
          fullWidth
          autoFocus
          focused
          label={props.label}
          InputProps={{
            ...params.InputProps,
            className: 'text-black p-0'
          }}
        />
      )}
    />
  );
}

PegawaiAutoComplete.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  onChange: PropTypes.func.isRequired,
  currentAgen: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium'])
};

export default PegawaiAutoComplete;
