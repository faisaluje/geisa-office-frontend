import React from 'react';
import { Typography } from '@material-ui/core';

function MesinToolbar() {
	return (
		<div className="flex justify-between">
			<div className="flex flex-row items-center">
				<Typography variant="h6">Mesin Terdaftar</Typography>
			</div>
		</div>
	);
}

export default MesinToolbar;
