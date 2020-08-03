import FuseScrollbars from '@fuse/core/FuseScrollbars';
import {
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPegawaiDialog, setPegawaiForm } from './store/formSlice';
import { getListPegawai } from './store/tableSlice';

function PegawaiTable() {
	const dispatch = useDispatch();
	const { data, params, isLoading } = useSelector(({ pegawai }) => pegawai.table);
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		if (params) {
			dispatch(getListPegawai());
		}
	}, [dispatch, params]);

	React.useEffect(() => {
		if (data?.items) {
			setRows(data?.items);
		} else {
			setRows([]);
		}
	}, [data]);

	const onClickPegawai = pegawai => {
		dispatch(setPegawaiForm(pegawai));
		dispatch(openPegawaiDialog());
	};

	if (isLoading) {
		return (
			<div className="flex flex-col justify-center text-center items-center h-full">
				<CircularProgress />
				<Typography className="mt-8">Sedang memuat data. . .</Typography>
			</div>
		);
	}

	return (
		<FuseScrollbars className="flex mt-8">
			<TableContainer
				component={Paper}
				elevation={3}
				className="w-full"
				style={{ height: 'calc(100vh - 238px)' }}
			>
				<Table stickyHeader size="small">
					<TableHead>
						<TableRow>
							<TableCell rowSpan={2} className="text-14 font-bold">
								No.
							</TableCell>
							<TableCell rowSpan={2} className="text-14 font-bold">
								Nama
							</TableCell>
							<TableCell rowSpan={2} className="text-14 font-bold">
								NIP
							</TableCell>
							<TableCell rowSpan={2} className="text-14 font-bold">
								Jabatan
							</TableCell>
							<TableCell colSpan={2} className="text-14 font-bold w-160" align="center">
								kehadiran
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center" style={{ top: 37 }}>
								Masuk
							</TableCell>
							<TableCell align="center" style={{ top: 37 }}>
								Pulang
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{rows?.length < 1 ? (
							<TableRow hover>
								<TableCell colSpan="6" align="center">
									Pegawai tidak ditemukan. . .
								</TableCell>
							</TableRow>
						) : (
							rows.map((pegawai, idx) => (
								<TableRow hover key={idx}>
									<TableCell>{idx + 1}</TableCell>
									<TableCell className="flex flex-row">
										<Tooltip
											arrow
											classes={{ tooltip: 'text-14' }}
											title="Klik untuk melihat detil Pegawai"
										>
											<Typography
												className={
													pegawai.mesinUsers?.length > 0
														? 'text-blue hover:underline'
														: 'text-grey hover:underline'
												}
												role="button"
												onClick={() => onClickPegawai(pegawai)}
												color="inherit"
											>
												{pegawai.nama}
											</Typography>
										</Tooltip>
									</TableCell>
									<TableCell>{pegawai.nip}</TableCell>
									<TableCell>{pegawai.jabatan?.nama}</TableCell>
									<TableCell align="center">-</TableCell>
									<TableCell align="center">-</TableCell>
								</TableRow>
							))
						)}
						{rows?.length < 1 ? (
							<TableRow hover>
								<TableCell colSpan="6" align="center">
									Pegawai tidak ditemukan. . .
								</TableCell>
							</TableRow>
						) : (
							rows.map((pegawai, idx) => (
								<TableRow hover key={idx}>
									<TableCell>{idx + 1}</TableCell>
									<TableCell className="flex flex-row">
										<Tooltip
											arrow
											classes={{ tooltip: 'text-14' }}
											title="Klik untuk melihat detil Pegawai"
										>
											<Typography
												className={
													pegawai.mesinUsers?.length > 0
														? 'text-blue hover:underline'
														: 'text-grey hover:underline'
												}
												role="button"
												onClick={() => onClickPegawai(pegawai)}
												color="inherit"
											>
												{pegawai.nama}
											</Typography>
										</Tooltip>
									</TableCell>
									<TableCell>{pegawai.nip}</TableCell>
									<TableCell>{pegawai.jabatan?.nama}</TableCell>
									<TableCell align="center">-</TableCell>
									<TableCell align="center">-</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</FuseScrollbars>
	);
}

export default PegawaiTable;
