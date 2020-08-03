import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Instansi from '../instansi/Instansi';
import Mesin from '../mesin/Mesin';
import Pegawai from '../pegawai/Pegawai';

function Dashboard(props) {
	// const { params } = props.match;

	// React.useEffect(() => {
	// 	dispatch(getAllPengaturan());
	// }, [dispatch]);

	// React.useEffect(() => {
	// 	if (params.menu === 'changelog') {
	// 		dispatch(openDaftarPerubahanDialog());
	// 	}
	// }, [dispatch, params.menu, props]);

	return (
		<FuseAnimate animation="transition.whirlIn" duration={400} delay={400}>
			<div className="flex lg:flex-row sm:flex-col flex-col w-screen px-24 pt-12">
				{/* <DaftarPerubahanDialog /> */}

				<div className="flex flex-1 flex-col lg:mr-16 lg:w-1/3 w-full" style={{ height: 'calc(100vh - 95px)' }}>
					<Instansi />
					<Mesin />
				</div>

				<div className="flex lg:w-2/3 w-full" style={{ height: 'calc(100vh - 95px)' }}>
					<Pegawai />
				</div>
			</div>
		</FuseAnimate>
	);
}

export default Dashboard;
