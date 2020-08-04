import { AppBar, Dialog, Icon, IconButton, Paper, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PegawaiForm from './PegawaiForm';
import PegawaiLogs from './PegawaiLogs';
import { closePegawaiDialog } from './store/formSlice';

function PegawaiDialog() {
	const dispatch = useDispatch();
	const { props, data } = useSelector(({ pegawai }) => pegawai.form);
	const [selectedTab, setSelectedTab] = React.useState(0);

	const handleTabChange = (_event, value) => {
		setSelectedTab(value);
	};

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
						{data?.id && `Detail Pegawai ${data.nama}`}
					</Typography>

					<div className="flex flex-row">
						<IconButton color="inherit" onClick={closeDialog}>
							<Icon className="text-28">close</Icon>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>

			<Paper elevation={5}>
				<Tabs
					value={selectedTab}
					onChange={handleTabChange}
					indicatorColor="secondary"
					textColor="secondary"
					variant="fullWidth"
					scrollButtons="off"
					classes={{
						root: 'h-24 w-full bg-gray-100'
					}}
					centered
				>
					<Tab
						classes={{
							root: 'h-24 capitalize'
						}}
						label="Data Diri"
					/>
					<Tab
						classes={{
							root: 'h-24 capitalize'
						}}
						label="Logs Kehadiran"
					/>
				</Tabs>

				{selectedTab === 0 && <PegawaiForm />}
				{selectedTab === 1 && <PegawaiLogs />}
			</Paper>
		</Dialog>
	);
}

export default PegawaiDialog;
