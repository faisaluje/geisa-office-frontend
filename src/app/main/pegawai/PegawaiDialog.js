import { AppBar, Dialog, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PegawaiForm from './PegawaiForm';
import { closePegawaiDialog } from './store/formSlice';

function PegawaiDialog() {
	const dispatch = useDispatch();
	const { props, data } = useSelector(({ pegawai }) => pegawai.form);

	const closeDialog = () => {
		dispatch(closePegawaiDialog());
	};

	return (
		<Dialog
			classes={{ paper: 'm-24 rounded-8' }}
			{...props}
			onClose={closeDialog}
			fullWidth
			maxWidth="sm"
			disableBackdropClick
			disableEscapeKeyDown
		>
			<AppBar position="static" elevation={1} className="flex flex-col">
				<Toolbar className="flex items-center justify-between w-full">
					<Typography variant="subtitle1" color="inherit">
						{!data?.id && 'Tambah Pegawai'}
						{data?.id && 'Pegawai Detail'}
					</Typography>

					<div className="flex flex-row">
						<IconButton color="inherit" onClick={closeDialog}>
							<Icon className="text-28">close</Icon>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>

			<PegawaiForm />
		</Dialog>
	);
}

export default PegawaiDialog;
