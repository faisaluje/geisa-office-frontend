import {
	Button,
	CircularProgress,
	Container,
	Icon,
	IconButton,
	Input,
	MenuItem,
	TextField,
	Tooltip,
	Typography
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { DatePicker } from '@material-ui/pickers';
import { openPegawaiDialog } from './store/formSlice';
import { refreshListPegawai, setParamsListPegawai } from './store/tableSlice';
import DivisiService from './services/divisi.service';

function PegawaiToolbar() {
	const dispatch = useDispatch();
	const { isOnline } = useSelector(({ auth }) => auth.user);
	const { params } = useSelector(({ pegawai }) => pegawai.table);
	const [txtCari, setTxtCari] = React.useState('');
	const [listDivisi, setListDivisi] = React.useState([]);
	const [isLoadingDivisi, setIsLoadingDivisi] = React.useState(true);

	React.useEffect(() => {
		if (params?.nama) {
			setTxtCari(params.nama);
		} else {
			setTxtCari('');
		}
	}, [params]);

	React.useEffect(() => {
		setIsLoadingDivisi(true);
		DivisiService.getListDivisiByPegawai()
			.then(result => {
				setListDivisi(result.data);
			})
			.finally(() => setIsLoadingDivisi(false));
	}, []);

	const changeParams = values => {
		dispatch(setParamsListPegawai(values));
		dispatch(refreshListPegawai());
	};

	return (
		<div className="flex w-full justify-between">
			<div className="flex flex-row items-center">
				<Typography variant="h6">Pegawai</Typography>

				<Tooltip arrow classes={{ tooltip: 'max-w-256 text-center text-14' }} title="Refresh Pegawai">
					<Button
						variant="outlined"
						color="inherit"
						size="small"
						className="ml-8 min-w-0 w-0 px-10"
						onClick={() => dispatch(refreshListPegawai())}
					>
						<RefreshIcon className="text-19 font-bold" />
					</Button>
				</Tooltip>

				<Tooltip
					arrow
					classes={{ tooltip: 'max-w-256 text-center text-14' }}
					title={`Tambah Pegawai ${!isOnline ? '(harus terhubung dengan internet)' : ''}`}
				>
					<Button
						variant="outlined"
						color="inherit"
						size="small"
						className="ml-8 min-w-0 w-0 px-10"
						onClick={() => dispatch(openPegawaiDialog())}
					>
						<AddIcon className="text-19 font-bold" />
					</Button>
				</Tooltip>
			</div>

			<div className="flex flex-1 items-center ">
				<FuseAnimate animation="transition.slideDownIn" delay={800}>
					<Container className="flex sm:mx-12 items-center w-224 px-8 border rounded-8">
						<Input
							placeholder="Cari. . . "
							className="flex flex-1"
							disableUnderline
							fullWidth
							value={txtCari}
							inputProps={{
								'aria-label': 'Search'
							}}
							onChange={ev => setTxtCari(ev.target.value)}
						/>

						<Tooltip classes={{ tooltip: 'text-14' }} arrow title="Klik untuk mencari">
							<IconButton
								size="small"
								onClick={() => dispatch(setParamsListPegawai({ ...params, nama: txtCari, page: 1 }))}
							>
								<Icon className="ml-8" color="action">
									search
								</Icon>
							</IconButton>
						</Tooltip>
					</Container>
				</FuseAnimate>

				{isLoadingDivisi ? (
					<CircularProgress />
				) : (
					<TextField
						select
						className="sm:mr-12"
						style={{ width: '20rem' }}
						size="small"
						label="Divisi"
						value={params?.divisi || ''}
						onChange={event =>
							changeParams({
								...params,
								page: 1,
								divisi: event.target.value
							})
						}
					>
						<MenuItem value="">-- SEMUA --</MenuItem>
						{listDivisi?.map(divisi => (
							<MenuItem key={divisi.id} value={divisi.id}>
								{divisi.nama}
							</MenuItem>
						))}
					</TextField>
				)}

				<TextField
					select
					style={{ width: '12rem' }}
					size="small"
					label="Status Pegawai"
					value={params?.status || 'aktif'}
					onChange={event =>
						changeParams({
							...params,
							page: 1,
							status: event.target.value
						})
					}
				>
					<MenuItem value="aktif">Aktif</MenuItem>
					<MenuItem value="tidak_aktif">Tidak Aktif</MenuItem>
				</TextField>
			</div>

			<div className="sm:ml-12 flex w-128">
				<DatePicker
					label="Tanggal Kehadiran"
					size="small"
					value={new Date()}
					onChange={date => console.log(date.format('YYYY-MM-DD'))}
					disableFuture
					format="YYYY-MM-DD"
				/>
			</div>
		</div>
	);
}

export default PegawaiToolbar;
