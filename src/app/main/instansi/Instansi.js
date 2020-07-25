import { CircularProgress, Paper, Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import reducer from './store';
import { getInstansi } from './store/instansiSlice';

const InfoInstansi = ({ instansi }) => (
	<div className="p-16 flex flex-col">
		<div className="flex flex-row">
			<Typography className="h2">{instansi.nama || '-'}</Typography>
		</div>
		<Typography variant="subtitle2">NRI: {instansi.no}</Typography>
	</div>
);

function Instansi() {
	const dispatch = useDispatch();
	const instansi = useSelector(({ info }) => info.instansi);

	React.useEffect(() => {
		dispatch(getInstansi());
	}, [dispatch]);

	return (
		<Paper className="w-full mb-16 rounded-8">
			{instansi.isLoading ? (
				<div className="flex flex-col flex-auto overflow-auto items-center p-24">
					<CircularProgress color="secondary" />
					<Typography className="mt-8">Sedang memuat data. . .</Typography>
				</div>
			) : (
				<>{instansi.data ? <InfoInstansi instansi={instansi.data} /> : '-'}</>
			)}

			{/* <div className="flex justify-between p-16">
				<InfoToken />
				<KirimServer />
			</div> */}
		</Paper>
	);
}

export default withReducer('info', reducer)(Instansi);
