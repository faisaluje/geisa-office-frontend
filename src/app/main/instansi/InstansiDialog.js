import { AppBar, Dialog, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InstansiForm from './InstansiForm';
import { closeInstansiDialog } from './store/instansiSlice';

function InstansiDialog() {
	const dispatch = useDispatch();
	const { props, isLoading } = useSelector(({ info }) => info.instansi.form);

	const closeDialog = () => {
		dispatch(closeInstansiDialog());
	};

	return (
		<Dialog
			classes={{ paper: 'm-24 rounded-8' }}
			{...props}
			onClose={closeDialog}
			maxWidth="md"
			disableBackdropClick
			disableEscapeKeyDown
		>
			<AppBar position="static" elevation={1} className="flex flex-col">
				<Toolbar className="flex items-center justify-between w-full">
					<Typography variant="subtitle1" color="inherit">
						Pengaturan Instansi
					</Typography>

					<div className="flex flex-row">
						<IconButton disabled={isLoading} color="inherit" onClick={closeDialog}>
							<Icon className="text-28">close</Icon>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>

			<InstansiForm />
		</Dialog>
	);
}

export default InstansiDialog;
