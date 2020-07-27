/* eslint-disable radix */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import { setParamsListLogs } from '../store/logsSlice';

function LogsFooter() {
	const dispatch = useDispatch();
	const { table, params } = useSelector(({ mesin }) => mesin.logs);

	const handleChange = (_event, value) => {
		dispatch(
			setParamsListLogs({
				...params,
				page: value
			})
		);
	};

	return (
		<div className="flex flex-wrap mt-10 p-8 justify-center w-full bg-gray-50">
			<div className="flex flex-1 items-center font-bold">Total Logs : {table?.meta?.totalItems}</div>

			<div className="flex mt-12 sm:mt-0">
				{table?.meta?.totalPages && (
					<Pagination
						count={table.meta.totalPages}
						page={parseInt(table.meta.currentPage)}
						onChange={handleChange}
						showFirstButton
						showLastButton
					/>
				)}
			</div>
		</div>
	);
}

export default LogsFooter;
