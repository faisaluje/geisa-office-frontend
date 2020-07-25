import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Card, CardContent, Typography, Button, InputAdornment, Icon, IconButton } from '@material-ui/core';
import Formsy from 'formsy-react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { TextFieldFormsy } from '@fuse/core/formsy';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { exitLogin, submitLogin } from 'app/auth/store/loginSlice';

function Login() {
	const dispatch = useDispatch();
	const { success, error } = useSelector(({ auth }) => auth.login);
	const [isFormValid, setIsFormValid] = React.useState(false);
	const [btnLabel, setBtnLabel] = React.useState('Login');
	const [showPassword, setShowPassword] = React.useState(false);
	const formRef = React.useRef(null);
	console.log(success, error);

	React.useEffect(() => {
		if (!success && error) {
			dispatch(
				showMessage({
					message: error, // text or html
					autoHideDuration: 6000, // ms
					anchorOrigin: {
						vertical: 'top', // top bottom
						horizontal: 'center' // left center right
					},
					variant: 'error' // success error info warning null
				})
			);
			setBtnLabel('Login');
		}

		return () => dispatch(exitLogin());
	}, [dispatch, error, success]);

	const disableButton = () => {
		setIsFormValid(false);
	};
	const enableButton = () => {
		setBtnLabel('Login');
		setIsFormValid(true);
	};

	const handleSubmit = model => {
		setBtnLabel('Tunggu Sebentar');
		disableButton();
		dispatch(submitLogin(model));
	};

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 items-center justify-center w-screen p-32 bg-gray-200">
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384 rounded-12">
						<CardContent className="flex flex-col items-center justify-center p-32">
							<img className="w-256 m-32" src="assets/images/logos/geisa.svg" alt="logo" />

							<Typography variant="h6" className="mt-16 mb-16">
								Login ke Akun Anda
							</Typography>

							<Formsy
								onValidSubmit={handleSubmit}
								onValid={enableButton}
								onInvalid={disableButton}
								ref={formRef}
								name="loginForm"
								className="flex flex-col justify-center w-full"
							>
								<FuseAnimateGroup
									enter={{
										animation: 'transition.bounceUpIn',
										duration: 400,
										delay: 400
									}}
								>
									<TextFieldFormsy
										className="mb-16"
										label="Username"
										autoFocus
										name="username"
										validations="isEmail"
										validationError="username tidak valid"
										variant="outlined"
										required
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Icon className="text-20" color="action">
														email
													</Icon>
												</InputAdornment>
											)
										}}
										fullWidth
									/>

									<TextFieldFormsy
										className="mb-16"
										label="Password"
										type="password"
										name="password"
										variant="outlined"
										required
										InputProps={{
											className: 'pr-2',
											type: showPassword ? 'text' : 'password',
											endAdornment: (
												<InputAdornment position="end">
													<IconButton onClick={() => setShowPassword(!showPassword)}>
														<Icon className="text-20" color="action">
															{showPassword ? 'visibility' : 'visibility_off'}
														</Icon>
													</IconButton>
												</InputAdornment>
											)
										}}
										fullWidth
									/>

									<Button
										variant="contained"
										color="primary"
										className="w-224 mx-auto mt-16 w-full"
										aria-label="LOG IN"
										disabled={!isFormValid}
										type="submit"
									>
										{btnLabel}
									</Button>
								</FuseAnimateGroup>
							</Formsy>
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default Login;
