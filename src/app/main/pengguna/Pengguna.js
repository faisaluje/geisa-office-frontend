import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { AppBar, CircularProgress, Dialog, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { closeListPenggunaDialog, getListPengguna } from './store/tableSlice';
import reducer from './store';
import PenggunaToolbar from './PenggunaToolbar';
import PenggunaTable from './PenggunaTable';
import PenggunaFooter from './PenggunaFooter';
import PenggunaDialog from './PenggunaDialog';

function Pengguna() {
	const dispatch = useDispatch();
	const { isLoading, props, params } = useSelector(({ pengguna }) => pengguna.table);

	React.useEffect(() => {
		if (params) {
			dispatch(getListPengguna());
		}
	}, [dispatch, params]);

	const handleClose = () => {
		dispatch(closeListPenggunaDialog());
	};

	return (
		<Dialog
			classes={{ paper: 'rounded-8 w-full' }}
			{...props}
			onClose={handleClose}
			maxWidth="md"
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
					<PenggunaDialog />
					<AppBar position="static" elevation={1} className="flex flex-col">
						<Toolbar className="flex flex-row items-center justify-between w-full">
							<Typography variant="subtitle1" color="inherit">
								Daftar Pengguna
							</Typography>

							<div className="flex flex-row -mr-24">
								<IconButton color="inherit" onClick={handleClose}>
									<Icon className="text-28">close</Icon>
								</IconButton>
							</div>
						</Toolbar>
					</AppBar>

					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideDownIn',
							delay: 200,
							duration: 500
						}}
						className="flex flex-col flex-auto overflow-auto items-center p-24"
					>
						<PenggunaToolbar />
						<PenggunaTable />
						<PenggunaFooter />
					</FuseAnimateGroup>
				</>
			)}
		</Dialog>
	);
}

export default withReducer('pengguna', reducer)(Pengguna);
