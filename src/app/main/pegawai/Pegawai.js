import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { useSelector } from 'react-redux';
import PegawaiToolbar from './PegawaiToolbar';
import reducer from './store';
import PegawaiDialog from './PegawaiDialog';
import PegawaiTable from './PegawaiTable';
import PegawaiFooter from './PegawaiFooter';

function Pegawai() {
	const { isError, msg } = useSelector(({ pegawai }) => pegawai.table);

	return (
		<>
			<PegawaiDialog />
			<Paper className="flex flex-col w-full mb-16 sm:mb-0 p-16 rounded-8 border-1 sm:h-full overflow-hidden">
				<PegawaiToolbar />
				{isError && (
					<Paper className="h-68 bg-red-200 flex items-center justify-center">
						<Typography className="font-bold m-0">{msg}</Typography>
					</Paper>
				)}
				{/* <PegawaiTabs /> */}
				<PegawaiTable />
				<PegawaiFooter />
			</Paper>
		</>
	);
}

export default withReducer('pegawai', reducer)(Pegawai);
