/* eslint-disable radix */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

function UsersTable() {
	const { table } = useSelector(({ mesin }) => mesin.users);
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		if (table?.items) {
			setRows(table.items);
		}
	}, [table]);

	console.log(table);

	return (
		<FuseScrollbars className="flex">
			<div className="w-full" style={{ height: 'calc(100vh - 495px)' }}>
				<Table stickyHeader size="small">
					<TableHead>
						<TableRow>
							<TableCell className="text-14 font-bold">User ID</TableCell>
							<TableCell className="text-14 font-bold">Nama</TableCell>
							<TableCell className="text-14 font-bold">Pegawai Dipilih</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{rows.length > 0 ? (
							rows.map(user => (
								<TableRow key={user.id}>
									<TableCell>{user.pin}</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.name}</TableCell>
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
