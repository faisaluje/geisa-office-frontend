import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	TextField,
	Typography
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DivisiAutoComplete from '../components/DivisiAutoComplete';
import JabatanAutoComplete from '../components/JabatanAutoComplete';
import DivisiService from './services/divisi.service';
import JabatanService from './services/jabatan.service';
import { closePegawaiDialog, savePegawai, setPegawaiForm } from './store/formSlice';

function PegawaiForm() {
	const dispatch = useDispatch();
	const { data, isError, msg, isLoading } = useSelector(({ pegawai }) => pegawai.form);
	const { form, setForm, handleChange, setInForm } = useForm({});
	const [listDivisi, setListDivisi] = React.useState(null);
	const [isLoadingDivisi, setIsLoadingDivisi] = React.useState(true);
	const [listJabatan, setListJabatan] = React.useState(null);
	const [isLoadingJabatan, setIsLoadingJabatan] = React.useState(true);
	const canBeSubmitted = !!form?.nama;

	React.useEffect(() => {
		if (!listDivisi) {
			setIsLoadingDivisi(true);
			DivisiService.getListDivisi()
				.then(result => setListDivisi(result.data || []))
				.finally(() => setIsLoadingDivisi(false));
		}
	}, [listDivisi]);

	React.useEffect(() => {
		if (!listJabatan) {
			setIsLoadingJabatan(true);
			JabatanService.getListJabatan()
				.then(result => setListJabatan(result.data || []))
				.finally(() => setIsLoadingJabatan(false));
		}
	}, [listJabatan]);

	React.useEffect(() => {
		if (data) {
			setForm({ ...data });
		} else {
			setForm({});
		}
	}, [data, setForm]);

	React.useEffect(() => {
		if (!isLoading && !isError && msg) {
			dispatch(
				showMessage({
					message: msg, // text or html
					autoHideDuration: 6000, // ms
					anchorOrigin: {
						vertical: 'top', // top bottom
						horizontal: 'center' // left center right
					},
					variant: 'success' // success error info warning null
				})
			);
			dispatch(closePegawaiDialog());
		}
	}, [dispatch, isError, isLoading, msg]);

	const handleSubmit = event => {
		event.preventDefault();
		dispatch(
			openDialog({
				children: (
					<>
						<DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Apakan anda sudah yakin ?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => dispatch(closeDialog())}>Tidak</Button>
							<Button onClick={() => onSubmit()} autoFocus>
								Iya
							</Button>
						</DialogActions>
					</>
				)
			})
		);
	};

	const onSubmit = () => {
		dispatch(setPegawaiForm(form));
		dispatch(savePegawai({ ...form }));
		dispatch(closeDialog());
	};

	return (
		<>
			<Dialog classes={{ paper: 'rounded-8 p-24' }} open={isLoading} disableEscapeKeyDown disableBackdropClick>
				<div className="flex flex-col justify-center text-center items-center h-full p-16">
					<CircularProgress />
					<Typography className="mt-8">Sedang memproses. . .</Typography>
				</div>
			</Dialog>

			<form onSubmit={handleSubmit} className="flex flex-col overflow-auto">
				<DialogContent classes={{ root: 'p-24' }}>
					<FuseAnimateGroup
						enter={{
							animation: 'transition.whirlIn',
							delay: 200,
							duration: 500
						}}
					>
						{isError && (
							<div className="flex mb-16">
								<Paper className="w-full bg-red-500 p-8 text-white">{msg || 'Gagal menyimpan'}</Paper>
							</div>
						)}

						<div className="flex mb-16">
							<Typography className="min-w-160 font-bold pt-12">NIP:</Typography>

							<TextField fullWidth name="nip" onChange={handleChange} value={form?.nip || ''} />
						</div>

						<div className="flex mb-16">
							<Typography className="min-w-160 font-bold pt-12">Nama Lengkap:</Typography>

							<TextField fullWidth name="nama" onChange={handleChange} value={form?.nama || ''} />
						</div>

						<div className="flex mb-16">
							<Typography className="min-w-160 font-bold pt-12">Tempat Lahir:</Typography>

							<TextField fullWidth name="tmpLahir" onChange={handleChange} value={form?.tmpLahir || ''} />
						</div>

						<div className="flex mb-16">
							<Typography className="min-w-160 font-bold pt-12">Tgl Lahir:</Typography>

							<KeyboardDatePicker
								autoOk
								variant="inline"
								invalidDateMessage="Tanggal tidak valid"
								format="DD-MM-YYYY"
								value={form.tglLahir}
								onChange={date => setInForm('tglLahir', date?.toDate() || null)}
							/>
						</div>

						<div className="flex mb-16">
							<Typography className="min-w-160 font-bold pt-12">No. Handphone:</Typography>

							<TextField fullWidth name="noTlp" onChange={handleChange} value={form?.noTlp || ''} />
						</div>

						<div className="flex mb-16">
							<Typography className="min-w-160 font-bold pt-12">Divisi:</Typography>

							<DivisiAutoComplete
								style={{ width: '100%' }}
								data={listDivisi || []}
								value={form?.divisi || null}
								required
								loading={isLoadingDivisi}
								onChange={(_event, newValue) => {
									if (newValue) {
										if (newValue.inputValue) {
											setInForm(`divisi`, { nama: newValue.inputValue });
										}

										if (newValue.id) {
											setInForm(`divisi`, newValue);
										}
									} else {
										setInForm(`divisi`, null);
									}
								}}
							/>
						</div>

						<div className="flex mb-16">
							<Typography className="min-w-160 font-bold pt-12">Jabatan:</Typography>

							<JabatanAutoComplete
								style={{ width: '100%' }}
								data={listJabatan || []}
								value={form?.jabatan || null}
								required
								loading={isLoadingJabatan}
								onChange={(_event, newValue) => {
									if (newValue) {
										if (newValue.inputValue) {
											setInForm(`jabatan`, { nama: newValue.inputValue });
										}

										if (newValue.id) {
											setInForm(`jabatan`, newValue);
										}
									} else {
										setInForm(`jabatan`, null);
									}
								}}
							/>
						</div>
					</FuseAnimateGroup>
				</DialogContent>

				<DialogActions>
					<Button variant="contained" color="primary" type="submit" disabled={!canBeSubmitted}>
						Simpan
					</Button>
				</DialogActions>
			</form>
		</>
	);
}

export default PegawaiForm;
