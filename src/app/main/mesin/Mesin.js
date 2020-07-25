import React from 'react';
import { Paper, CircularProgress, Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { useSelector, useDispatch } from 'react-redux';
import reducer from './store';
import { getListMesin } from './store/tableSlice';
import MesinTable from './MesinTable';

function Mesin() {
	const dispatch = useDispatch();
	const { isLoading, data: dataInstansi } = useSelector(({ info }) => info.instansi);

	React.useEffect(() => {
		if (!isLoading && dataInstansi) {
			dispatch(getListMesin());
		}
	}, [dataInstansi, dispatch, isLoading]);

	return (
		<Paper className="flex flex-col w-full mb-16 sm:mb-0 p-16 rounded-8 border-1 sm:h-full overflow-hidden">
			{isLoading ? (
				<div className="flex flex-col justify-center text-center items-center h-full">
					<CircularProgress />
					<Typography className="mt-8">Sedang melakukan sinkronisasi dengan mesin. . .</Typography>
				</div>
			) : (
				<>
					<h2>List Mesin</h2>
					{/* <MesinHeader /> */}
					<MesinTable />
					{/* <MesinDialog /> */}
				</>
			)}
		</Paper>
	);
}

export default withReducer('mesin', reducer)(Mesin);
