import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import {
	Button,
	CircularProgress,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	TextField,
	Typography
} from '@material-ui/core';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WilayahAutoComplete from '../components/WilayahAutoComplete';
import { closeInstansiDialog, getInstansi, saveInstansi, setInstansiForm } from './store/instansiSlice';

function InstansiForm() {
	const dispatch = useDispatch();
	const { data, isError, msg, isLoading } = useSelector(({ info }) => info.instansi.form);
	const { form, setForm, setInForm, handleChange } = useForm({});
	const canBeSubmitted = !!form?.nama;

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

			dispatch(getInstansi());
			dispatch(closeInstansiDialog());
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
		dispatch(setInstansiForm(form));
		console.log(form);
		dispatch(saveInstansi({ ...form }));
		dispatch(closeDialog());
	};

	if (isLoading) {
		return (
			<div className="flex flex-col justify-center text-center items-center h-full p-16">
				<CircularProgress />
				<Typography className="mt-8">Sedang memproses. . .</Typography>
			</div>
		);
	}

	return (
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
						<Typography className="min-w-160 font-bold pt-12">NRI:</Typography>

						<TextField
							style={{ width: '10rem' }}
							name="no"
							size="small"
							onChange={handleChange}
							value={form?.no || ''}
							InputProps={{ readOnly: true }}
						/>
					</div>

					<div className="flex mb-16">
						<Typography className="min-w-160 font-bold pt-12">Nama:</Typography>

						<TextField
							style={{ width: '35rem' }}
							name="nama"
							size="small"
							onChange={handleChange}
							value={form?.nama || ''}
						/>
					</div>

					<div className="flex mb-16">
						<Typography className="min-w-160 font-bold pt-12">Alamat:</Typography>

						<TextField
							style={{ width: '35rem' }}
							multiline
							rows={3}
							name="alamat"
							size="small"
							onChange={handleChange}
							value={form?.alamat || ''}
						/>
					</div>

					<div className="flex mb-16">
						<Typography className="min-w-160 font-bold pt-12">Wilayah:</Typography>

						<WilayahAutoComplete
							className="w-360"
							value={form?.wilayah || null}
							onChange={(_evt, val) => setInForm('wilayah', val)}
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
	);
}

export default InstansiForm;
