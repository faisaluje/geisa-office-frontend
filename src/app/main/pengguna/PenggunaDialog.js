import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, CircularProgress, Typography, AppBar, Toolbar, Icon, IconButton } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { closePenggunaDialog } from './store/formSlice';
import PenggunaForm from './PenggunaForm';
import reducer from './store';

function PenggunaDialog() {
	const dispatch = useDispatch();
	const { props, data, isLoading } = useSelector(({ pengguna }) => pengguna.form);

	const handleClose = () => {
		dispatch(closePenggunaDialog());
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
								{!data?.id ? 'Tambah Pengguna' : 'Ubah Pengguna'}
							</Typography>

							<div className="flex flex-row -mr-24">
								<IconButton color="inherit" onClick={handleClose}>
									<Icon className="text-28">close</Icon>
								</IconButton>
							</div>
						</Toolbar>
					</AppBar>

					<PenggunaForm />
				</>
			)}
		</Dialog>
	);
}

export default withReducer('pengguna', reducer)(PenggunaDialog);
