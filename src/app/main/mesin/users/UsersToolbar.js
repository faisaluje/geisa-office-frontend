import React from 'react';
import { Button, Icon, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { openUserDialog, refreshListUsers } from '../store/usersSlice';

function UsersToolbar() {
	const dispatch = useDispatch();
	const { data } = useSelector(({ mesin }) => mesin.form);

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
				<Tooltip
					arrow
					classes={{ tooltip: 'text-14' }}
					title={
						data?.connectedMesin?.status === 'online'
							? 'Klik untuk menambah user langsung ke mesin'
							: 'Menambah user harus terhubung dengan mesin'
					}
				>
					<span>
						<Button
							size="small"
							variant="contained"
							color="primary"
							disabled={data?.connectedMesin?.status === 'offline'}
							startIcon={<Icon>add</Icon>}
							onClick={() => dispatch(openUserDialog())}
						>
							Tambah User
						</Button>
					</span>
				</Tooltip>
			</div>
		</div>
	);
}

export default UsersToolbar;
