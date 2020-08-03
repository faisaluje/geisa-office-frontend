import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Tooltip } from '@material-ui/core';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import webSocket from 'app/helpers/webSocket';
import { openMesinDialog, setMesinFormData } from './store/formSlice';

function MesinTable() {
	const dispatch = useDispatch();
	const { data } = useSelector(({ mesin }) => mesin.table);
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		if (data) {
			setRows(data);
		}
	}, [data]);

	React.useEffect(() => {
		if (rows?.length > 0) {
			webSocket.socket.on('status-mesin', ({ sn, status }) => {
				const newRows = [...rows];
				const mesinIdx = newRows.findIndex(mesin => mesin.sn === sn);
				if (mesinIdx >= 0) {
					newRows[mesinIdx] = {
						...newRows[mesinIdx],
						connectedMesin: {
							status
						}
					};
					setRows(newRows);
				}
			});
		}
	}, [rows]);

	const clickDetail = mesin => {
		dispatch(setMesinFormData(mesin));
		dispatch(openMesinDialog());
	};

	return (
		<FuseScrollbars className="flex overflow-scroll">
			<Table stickyHeader size="small">
				<TableHead>
					<TableRow>
						<TableCell className="text-14 font-bold" align="center" style={{ width: 124 }}>
							Status
						</TableCell>
						<TableCell className="text-14 font-bold" align="center">
							SN
						</TableCell>
						<TableCell className="text-14 font-bold">Tipe</TableCell>
						<TableCell className="text-14 font-bold">Vendor</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{rows?.length < 1 ? (
						<TableRow hover>
							<TableCell colSpan={3} align="center">
								Belum ada mesin yang terdaftar . . .
							</TableCell>
						</TableRow>
					) : (
						rows?.map((mesin, idx) => (
							<TableRow hover key={idx}>
								<TableCell align="center">
									<Tooltip
										arrow
										title={
											mesin.connectedMesin?.status === 'online' ? 'Terhubung' : 'Tidak terhubung'
										}
									>
										<Brightness1Icon
											className={
												mesin.connectedMesin?.status === 'online'
													? 'text-green-500'
													: 'text-red-500'
											}
										/>
									</Tooltip>
								</TableCell>
								<TableCell>
									<Tooltip arrow classes={{ tooltip: 'text-14' }} title="Klik untuk melihat detil">
										<Typography
											className="text-blue hover:underline"
											role="button"
											onClick={() => clickDetail(mesin)}
											color="inherit"
										>
											{mesin.sn}
										</Typography>
									</Tooltip>
								</TableCell>
								<TableCell>{mesin.nama}</TableCell>
								<TableCell>{mesin.vendor}</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</FuseScrollbars>
	);
}

export default MesinTable;
