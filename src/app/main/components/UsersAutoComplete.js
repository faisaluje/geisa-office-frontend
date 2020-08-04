import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import Axios from 'axios';
import { URL_API } from 'app/constants';

function UsersAutoComplete(props) {
	const [options, setOptions] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	function onTextChanged(evt) {
		if (evt.target.value && evt.target.value.toString().trim().length >= 3) {
			setIsLoading(true);

			(async () => {
				let response;
				if (props.mesinId) {
					response = await Axios.get(`${URL_API}/mesin-users/${props.mesinId}?nama=${evt.target.value}`);
				} else {
					response = await Axios.get(`${URL_API}/mesin-users?nama=${evt.target.value}`);
				}

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
			classes={{ inputRoot: 'p-0' }}
			options={options}
			size={props.size}
			loading={isLoading}
			className={props.className}
			disabled={props.disabled || false}
			onChange={props.onChange}
			value={props.value}
			noOptionsText="Users tidak ditemukan"
			getOptionSelected={user => `${user.pin} - ${user.name}`}
			getOptionLabel={user => `${user.pin} - ${user.name}`}
			renderInput={params => (
				<TextField
					{...params}
					variant={props.variant}
					onChange={onTextChanged}
					fullWidth
					label={props.label}
					inputProps={{
						...params.inputProps,
						className: 'text-black'
					}}
				/>
			)}
		/>
	);
}

UsersAutoComplete.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
	size: PropTypes.oneOf(['small', 'medium']),
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	mesinId: PropTypes.string
};

export default UsersAutoComplete;
