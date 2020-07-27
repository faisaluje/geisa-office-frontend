import {
	AppBar,
	Dialog,
	DialogContent,
	Icon,
	IconButton,
	Paper,
	Tab,
	Tabs,
	Toolbar,
	Typography
} from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMesinDialog } from './store/formSlice';
import reducer from './store';
import MesinForm from './MesinForm';
import Users from './users/Users';
import Logs from './logs/Logs';

function MesinDialog() {
	const dispatch = useDispatch();
	const { props } = useSelector(({ mesin }) => mesin.form);
	const [selectedTab, setSelectedTab] = React.useState(0);

	const closeDialog = () => {
		dispatch(closeMesinDialog());
	};

	const handleTabChange = (_event, value) => {
		setSelectedTab(value);
	};

	return (
		<Dialog
			classes={{ paper: 'm-24 rounded-8' }}
			{...props}
			onClose={closeDialog}
			fullWidth
			maxWidth="md"
			disableBackdropClick
			disableEscapeKeyDown
		>
			<AppBar position="static" elevation={1} className="flex flex-col">
				<Toolbar className="flex items-center justify-between w-full">
					<Typography variant="subtitle1" color="inherit">
						Detail Mesin
					</Typography>

					<div className="flex flex-row">
						<IconButton color="inherit" onClick={closeDialog}>
							<Icon className="text-28">close</Icon>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-24' }}>
				<MesinForm />

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
								root: 'h-24'
							}}
							label="Users"
						/>
						<Tab
							className="tab-users-mesin"
							classes={{
								root: 'h-24'
							}}
							label="Logs"
						/>
					</Tabs>

					<div className="overflow-hidden" style={{ height: 'calc(100vh - 390px)' }}>
						{selectedTab === 0 && <Users />}
						{selectedTab === 1 && <Logs />}
					</div>
				</Paper>
			</DialogContent>
		</Dialog>
	);
}

export default withReducer('mesin', reducer)(MesinDialog);
