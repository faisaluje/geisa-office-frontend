import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'home',
		title: 'Home',
		type: 'item',
		icon: 'home',
		url: '/home',
		exact: false
	},
	{
		id: 'pengaturan',
		title: 'Pengaturan',
		type: 'group',
		icon: 'settings',
		children: [
			{
				id: 'pengguna',
				title: 'Pengguna',
				type: 'item',
				icon: 'supervisor_account',
				url: '/pengaturan-pengguna',
				exact: false
			}
		]
	}
];

export default navigationConfig;
