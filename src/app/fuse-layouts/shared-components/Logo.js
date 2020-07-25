import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { Chip, Tooltip } from '@material-ui/core';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import webSocket from 'app/helpers/webSocket';

const useStyles = makeStyles(theme => ({
	root: {
		'& .logo-icon': {
			width: 96,
			height: 96,
			transition: theme.transitions.create(['width', 'height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		},
		'& .react-badge, & .logo-text': {
			transition: theme.transitions.create('opacity', {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		}
	},
	reactBadge: {
		// backgroundColor: 'rgba(0,0,0,0.6)',
		color: '#61DAFB'
	}
}));

function Logo() {
	const classes = useStyles();
	const { isOnline } = useSelector(({ auth }) => auth.user);
	const [init, setInit] = React.useState(false);

	React.useEffect(() => {
		if (!init) {
			webSocket.socket.on('logs', data => {
				console.log(data);
			});
			setInit(true);
		}
	}, [init]);

	return (
		<div className={clsx(classes.root, 'flex items-center')}>
			<img className="logo-icon" src="./assets/images/logos/geisa.svg" alt="logo" />
			<div className={clsx(classes.reactBadge, 'react-badge flex items-center ml-8 mr-8 py-4 px-8 rounded')}>
				<span className="react-text text-16 italic">Office</span>
			</div>

			<Tooltip arrow title={isOnline ? 'Terhubung dengan internet' : 'Tidak terhubung dengan internet'}>
				<Chip
					className="lg:flex hidden"
					color="default"
					label={isOnline ? 'Online' : 'Offline'}
					icon={<Brightness1Icon className={isOnline ? 'text-green-400' : 'text-gray-400'} />}
				/>
			</Tooltip>
		</div>
	);
}

export default Logo;
