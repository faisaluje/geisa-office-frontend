import { CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListLogs } from '../store/logsSlice';
import LogsFooter from './LogsFooter';
import LogsTable from './LogsTable';
import LogsToolbar from './LogsToolbar';

function Logs() {
	const dispatch = useDispatch();
	const { data: dataMesin } = useSelector(({ mesin }) => mesin.form);
	const { isLoading, params } = useSelector(({ mesin }) => mesin.logs);

	React.useEffect(() => {
		if (dataMesin && params) {
			dispatch(getListLogs(dataMesin?.sn));
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
			<LogsToolbar />
			<LogsTable />
			<LogsFooter />
		</>
	);
}

export default Logs;
