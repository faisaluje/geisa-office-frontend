import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListUsers } from '../store/usersSlice';
import UsersDialog from './UsersDialog';
import UsersFooter from './UsersFooter';
import UsersTable from './UsersTable';
import UsersToolbar from './UsersToolbar';

function Users() {
	const dispatch = useDispatch();
	const { data: dataMesin } = useSelector(({ mesin }) => mesin.form);
	const { isLoading, params } = useSelector(({ mesin }) => mesin.users);

	React.useEffect(() => {
		if (dataMesin && params) {
			dispatch(getListUsers(dataMesin?.id));
		}
	}, [dataMesin, dispatch, params]);

	if (isLoading) {
		return (
			<div className="flex flex-col justify-center text-center items-center h-full">
				<CircularProgress />
				<Typography className="mt-8">Tunggu sebentar. . .</Typography>
			</div>
		);
	}

	return (
		<>
			<UsersDialog />
			<UsersToolbar />
			<UsersTable />
			<UsersFooter />
		</>
	);
}

export default Users;
