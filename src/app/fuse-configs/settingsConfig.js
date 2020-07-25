const settingsConfig = {
	layout: {
		style: 'layout2', // layout-1 layout-2 layout-3
		config: {
			footer: {
				display: false
			},
			toolbar: {
				display: false
			}
		} // checkout default layout configs at app/fuse-layouts for example  app/fuse-layouts/layout1/Layout1Config.js
	},
	customScrollbars: true,
	animations: true,
	direction: 'ltr', // rtl, ltr
	theme: {
		main: 'greeny',
		navbar: 'mainThemeDark',
		toolbar: 'mainThemeLight',
		footer: 'mainThemeDark'
	}
};

export default settingsConfig;
