/* eslint-disable radix */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import { startCase } from 'lodash';
import { setParamsListPegawai } from './store/tableSlice';

function PegawaiFooter() {
	const dispatch = useDispatch();
	const { data, params, isLoading } = useSelector(({ pegawai }) => pegawai.table);

	const handleChange = (_event, value) => {
		dispatch(
			setParamsListPegawai({
				...params,
				page: value
			})
		);
	};

	if (!isLoading) {
		return (
			<div className="flex flex-wrap mt-10 p-8 justify-center w-full bg-gray-50">
				<div className="flex flex-1 items-center font-bold">
					Total Pegawai {startCase(params?.status || 'aktif')} : {data?.meta?.totalItems}
				</div>

				<div className="flex mt-12 sm:mt-0">
					{data?.meta?.totalPages && (
						<Pagination
							count={data.meta.totalPages}
							page={parseInt(data.meta.currentPage)}
							onChange={handleChange}
							showFirstButton
							showLastButton
						/>
					)}
				</div>
			</div>
		);
	}

	return null;
}

export default PegawaiFooter;
