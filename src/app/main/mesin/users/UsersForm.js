import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { useForm } from '@fuse/hooks';
import {
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	TextField,
	Typography
} from '@material-ui/core';
import PegawaiAutoComplete from 'app/main/components/PegawaiAutoComplete';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeUserDialog, saveUser, setUserForm } from '../store/usersSlice';

function UsersForm() {
	const dispatch = useDispatch();
	const { data, isLoading, isError, msg } = useSelector(({ mesin }) => mesin.users.form);
	const { data: dataMesin } = useSelector(({ mesin }) => mesin.form);
	const { form, handleChange, setForm } = useForm({});
	const canBeSubmitted = form?.name?.trim().length > 0;

	React.useEffect(() => {
		if (data) {
			setForm({ ...data });
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
			dispatch(closeUserDialog());
		}
	}, [dispatch, isError, isLoading, msg]);

	const handleChangePegawai = (_evt, val) => {
		setForm({
			...form,
			pegawai: val,
			name: dataMesin?.connectedMesin?.status === 'online' ? val.nama : form.name
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		dispatch(
			openDialog({
				children: (
					<div>
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
					</div>
				)
			})
		);
	};

	const onSubmit = () => {
		dispatch(setUserForm(form));
		dispatch(saveUser({ ...form, mesin: dataMesin }));
		dispatch(closeDialog());
	};

	return (
		<form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
			<DialogContent classes={{ root: 'p-24' }}>
				<FuseAnimateGroup
					enter={{
						animation: 'transition.whirlIn',
						delay: 200,
						duration: 500
					}}
				>
					{isError && (
						<div className="flex">
							<Paper className="text-center w-full p-12 bg-red text-white font-bold">{msg}</Paper>
						</div>
					)}

					<div className="flex mb-24">
						<Typography className="min-w-136 font-bold pt-12">Pegawai Yang Dipilih:</Typography>

						<PegawaiAutoComplete
							className="w-full"
							value={form?.pegawai || null}
							onChange={handleChangePegawai}
						/>
					</div>

					<div className="flex mb-24">
						<Typography className="min-w-136 font-bold pt-12">NIP/ID Pengenal:</Typography>

						<TextField
							name="pin"
							helperText={data?.id ? 'Tidak bisa dirubah' : 'Boleh dikosongkan'}
							value={form?.pin || ''}
							onChange={handleChange}
							fullWidth
							InputProps={{
								readOnly: !!data?.id || dataMesin?.connectedMesin?.status === 'offline'
							}}
						/>
					</div>

					<div className="flex mb-24">
						<Typography className="min-w-136 font-bold pt-12">Nama Pada Mesin:</Typography>

						<TextField
							name="name"
							type="text"
							value={form?.name || ''}
							onChange={handleChange}
							fullWidth
							onInput={e => {
								e.target.value = e.target.value.slice(0, 24);
							}}
							helperText={
								dataMesin?.connectedMesin?.status === 'offline' &&
								'Hanya bisa dirubah ketika terhubung dengan mesin'
							}
							InputProps={{
								readOnly: dataMesin?.connectedMesin?.status === 'offline'
							}}
						/>
					</div>
				</FuseAnimateGroup>
			</DialogContent>

			<DialogActions>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleSubmit}
					type="submit"
					disabled={!canBeSubmitted}
				>
					Simpan
				</Button>
			</DialogActions>
		</form>
	);
}

export default UsersForm;
