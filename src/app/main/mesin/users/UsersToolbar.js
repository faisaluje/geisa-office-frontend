import React from 'react';
import { Button, Icon } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { refreshListUsers } from '../store/usersSlice';

function UsersToolbar() {
	const dispatch = useDispatch();

	return (
		<div className="p-8 mr-0 w-full flex flex-wrap justify-between">
			<div className="flex flex-wrap items-center">
				{/* <Typography className="mr-8">Cari : </Typography>
				<TextField
					variant="outlined"
					size="small"
					placeholder="Ketik Disini..."
					value={txtCari}
					onChange={event => dispatch(setTxtCariPeriode(event.target.value))}
				/> */}

				<Button
					size="small"
					variant="contained"
					color="primary"
					startIcon={<Icon>refresh</Icon>}
					onClick={() => dispatch(refreshListUsers())}
				>
					Refresh
				</Button>
			</div>

			<div className="flex flex-wrap items-center">
				<Button
					size="small"
					variant="contained"
					color="primary"
					startIcon={<Icon>add</Icon>}
					// onClick={() => dispatch(openPeriodeDialog())}
				>
					Tambah User
				</Button>
			</div>
		</div>
	);
}

export default UsersToolbar;
