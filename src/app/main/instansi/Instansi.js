import { CircularProgress, Icon, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InstansiDialog from './InstansiDialog';
import reducer from './store';
import { getInstansi, openInstansiDialog, setInstansiForm } from './store/instansiSlice';

const InfoInstansi = ({ instansi, onClickSetting }) => (
	<div className="p-16 flex flex-col">
		<div className="flex flex-row">
			<Typography variant="h6" className="flex flex-1">
				{instansi.nama || '-'}
			</Typography>

			<Tooltip arrow classes={{ tooltip: 'text-14' }} title="Pengaturan Instansi" className="flex">
				<IconButton onClick={onClickSetting} size="small">
					<Icon>settings</Icon>
				</IconButton>
			</Tooltip>
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

	const onClickSetting = () => {
		dispatch(setInstansiForm(instansi.data));
		dispatch(openInstansiDialog());
	};

	return (
		<Paper className="w-full mb-16 rounded-8">
			{instansi.isLoading ? (
				<div className="flex flex-col flex-auto overflow-auto items-center p-24">
					<CircularProgress color="secondary" />
					<Typography className="mt-8">Sedang memuat data. . .</Typography>
				</div>
			) : (
				<>
					<InstansiDialog />
					{instansi.data ? <InfoInstansi instansi={instansi.data} onClickSetting={onClickSetting} /> : '-'}
				</>
			)}

			{/* <div className="flex justify-between p-16">
				<InfoToken />
				<KirimServer />
			</div> */}
		</Paper>
	);
}

export default withReducer('info', reducer)(Instansi);
