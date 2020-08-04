/* eslint-disable radix */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core';
import { startCase } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openUserDialog, setUserForm } from '../store/usersSlice';

function UsersTable() {
	const dispatch = useDispatch();
	const { table } = useSelector(({ mesin }) => mesin.users);
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		if (table?.items) {
			setRows(table.items);
		}
	}, [table]);

	const onClickUser = user => {
		dispatch(setUserForm(user));
		dispatch(openUserDialog());
	};

	return (
		<FuseScrollbars className="flex">
			<div className="w-full" style={{ height: 'calc(100vh - 495px)' }}>
				<Table stickyHeader size="small">
					<TableHead>
						<TableRow>
							<TableCell className="text-14 font-bold">User ID</TableCell>
							<TableCell className="text-14 font-bold">Nama</TableCell>
							<TableCell className="text-14 font-bold">Pegawai yang Dipilih</TableCell>
							<TableCell className="text-14 font-bold">Status</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{rows.length > 0 ? (
							rows.map(user => (
								<TableRow hover key={user.id}>
									<TableCell>
										<Tooltip
											arrow
											classes={{ tooltip: 'text-14' }}
											title="Klik untuk melihat detil User"
										>
											<Typography
												className="text-blue hover:underline"
												role="button"
												onClick={() => onClickUser(user)}
												color="inherit"
											>
												{user.pin}
											</Typography>
										</Tooltip>
									</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>
										{user.pegawai ? (
											<div className="flex flex-col text-left">
												<Typography>{user.pegawai.nama}</Typography>
												<Typography variant="caption">NIP: {user.pegawai.nip}</Typography>
											</div>
										) : (
											'-'
										)}
									</TableCell>
									<TableCell>{startCase(user.status || '-')}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={3} align="center">
									Belum ada users. . .
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</FuseScrollbars>
	);
}

export default UsersTable;
