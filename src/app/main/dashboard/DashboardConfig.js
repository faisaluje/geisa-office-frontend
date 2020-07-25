import { authRoles } from 'app/auth';
import { lazy } from 'react';

const DashboardConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/:menu',
			component: lazy(() => import('./Dashboard'))
		}
	]
};

export default DashboardConfig;
