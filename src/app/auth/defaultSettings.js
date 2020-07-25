const defaultSettings = {
	layout: {
		style: 'layout2',
		config: {
			scroll: 'content',
			navbar: {
				display: true,
				folded: true,
				position: 'left'
			},
			toolbar: {
				display: false,
				style: 'fixed',
				position: 'below'
			},
			footer: {
				display: false,
				style: 'fixed',
				position: 'below'
			},
			mode: 'fullwidth'
		}
	},
	customScrollbars: true,
	theme: {
		main: 'legacy',
		navbar: 'mainThemeDark',
		toolbar: 'legacy',
		footer: 'legacy'
	}
};

export default defaultSettings;
