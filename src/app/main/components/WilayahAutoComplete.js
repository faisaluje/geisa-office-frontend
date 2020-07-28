import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import Axios from 'axios';

function WilayahAutoComplete(props) {
	const [options, setOptions] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	function onTextChanged(evt) {
		if (evt.target.value && evt.target.value.toString().trim().length >= 3) {
			setIsLoading(true);

			(async () => {
				const response = await Axios.get(`https://opstore.id/api/wilayah?limit=25&nama=${evt.target.value}`);

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
			className={props.className}
			disabled={props.disabled || false}
			onChange={props.onChange}
			value={props.value}
			noOptionsText="Wilayah tidak ditemukan"
			getOptionSelected={wilayah => wilayah.nama}
			getOptionLabel={wilayah => `${wilayah.nama} ${wilayah.mstWilayah ? `, ${wilayah.mstWilayah.nama}` : ''}`}
			renderInput={params => (
				<TextField
					{...params}
					variant={props.variant}
					onChange={onTextChanged}
					fullWidth
					inputProps={{
						...params.inputProps,
						className: 'text-black'
					}}
				/>
			)}
		/>
	);
}

WilayahAutoComplete.propTypes = {
	className: PropTypes.string,
	variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool
};

export default WilayahAutoComplete;
