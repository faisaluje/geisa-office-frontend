/* eslint-disable radix */
import moment from 'moment';
import { DialogContent, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers';
import MaterialTable from 'material-table';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogsVia from '../mesin/logs/LogsVia';
import { clearParamsListPegawaiLogs, getListPegawaiLogs, setParamsListPegawaiLogs } from './store/formSlice';

function PegawaiLogs() {
	const dispatch = useDispatch();
	const { isError, msg, params, data, isLoading } = useSelector(({ pegawai }) => pegawai.form.logs);
	const { data: dataPegawai } = useSelector(({ pegawai }) => pegawai.form);
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		if (dataPegawai && params) {
			dispatch(getListPegawaiLogs(dataPegawai.id));
		}
	}, [dataPegawai, dispatch, params]);

	React.useEffect(() => {
		if (data?.items) {
			setRows(data.items);
		} else {
			setRows([]);
		}
	}, [data]);

	React.useEffect(() => {
		return () => dispatch(clearParamsListPegawaiLogs());
	}, [dispatch]);

	return (
		<DialogContent classes={{ root: 'p-16' }}>
			<div className="flex flex-row justify-between w-full">
				<DatePicker
					label="Tanggal Mulai"
					value={params?.tglAwal || null}
					onChange={date =>
						dispatch(
							setParamsListPegawaiLogs({ ...params, tglAwal: date ? date.format('YYYY-MM-DD') : '' })
						)
					}
					disableFuture
					format="YYYY-MM-DD"
				/>

				<Typography className="m-auto"> s.d. </Typography>

				<DatePicker
					label="Tanggal Akhir"
					value={params?.tglAkhir || null}
					onChange={date =>
						dispatch(
							setParamsListPegawaiLogs({ ...params, tglAkhir: date ? date.format('YYYY-MM-DD') : '' })
						)
					}
					disableFuture
					format="YYYY-MM-DD"
				/>
			</div>

			{isError ? (
				<div className="justify-center text-center items-center">
					<Typography>{msg}</Typography>
				</div>
			) : (
				<MaterialTable
					isLoading={isLoading}
					columns={[
						{ title: 'Tanggal', field: 'date', defaultGroupOrder: 0 },
						{ title: 'Waktu', field: 'time' },
						{ title: 'Via', field: 'verify' }
					]}
					options={{
						toolbar: false,
						grouping: true,
						maxBodyHeight: 395,
						exportButton: true,
						paging: false
					}}
					data={rows?.map(log => ({
						date: moment(log.time).format('YYYY-MM-DD'),
						time: moment(log.time).format('HH:mm:ss'),
						verify: LogsVia[log.verify]
					}))}
					localization={{
						body: {
							emptyDataSourceMessage: 'Data tidak ditemukan.'
						}
					}}
				/>
			)}

			<div className="flex flex-wrap mt-10 p-8 justify-center w-full bg-gray-50">
				<div className="flex flex-1 items-center font-bold">Total Logs : {data?.meta?.totalItems}</div>

				<div className="flex mt-12 sm:mt-0">
					{data?.meta?.totalPages && (
						<Pagination
							count={data.meta.totalPages}
							page={parseInt(data.meta.currentPage) || 0}
							onChange={(_evt, page) => console.log(page)}
							showFirstButton
							showLastButton
						/>
					)}
				</div>
			</div>
		</DialogContent>
	);
}

export default PegawaiLogs;
