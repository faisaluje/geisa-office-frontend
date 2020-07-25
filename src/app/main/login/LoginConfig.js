import { authRoles } from 'app/auth';
import { lazy } from 'react';

const LoginConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/login',
			component: lazy(() => import('./Login'))
		}
	]
};

export default LoginConfig;
