/* eslint-disable radix */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import LogsVia from './LogsVia';

function LogsTable() {
	const { table } = useSelector(({ mesin }) => mesin.logs);
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		if (table?.items) {
			setRows(table.items);
		}
	}, [table]);

	return (
		<FuseScrollbars className="flex">
			<div className="w-full" style={{ height: 'calc(100vh - 495px)' }}>
				<Table stickyHeader size="small">
					<TableHead>
						<TableRow>
							<TableCell className="text-14 font-bold">Tgl Kehadiran</TableCell>
							<TableCell className="text-14 font-bold">User</TableCell>
							<TableCell className="text-14 font-bold">Via</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{rows.length > 0 ? (
							rows.map(log => (
								<TableRow key={log.id}>
									<TableCell>{moment(log.time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
									<TableCell>
										{log.pin} - {log.user?.name}
									</TableCell>
									<TableCell>{LogsVia[log.verify]}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={3} align="center">
									Belum ada logs. . .
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</FuseScrollbars>
	);
}

export default LogsTable;
