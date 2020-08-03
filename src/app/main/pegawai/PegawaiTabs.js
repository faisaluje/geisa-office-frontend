import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { useSelector } from 'react-redux';
import PegawaiTable from './PegawaiTable';
import DivisiService from './services/divisi.service';
import PegawaiFooter from './PegawaiFooter';

function PegawaiTabs() {
	const { isError, msg, isLoading } = useSelector(({ pegawai }) => pegawai.form);
	const [selectedTab, setSelectedTab] = React.useState(0);
	const [listDivisi, setListDivisi] = React.useState([]);

	React.useEffect(() => {
		DivisiService.getListDivisiByPegawai().then(result => {
			setListDivisi(result.data);
		});
	}, []);

	React.useEffect(() => {
		if (!isLoading && !isError && msg) {
			DivisiService.getListDivisiByPegawai().then(result => {
				setListDivisi(result.data);
			});
		}
	}, [isError, isLoading, msg]);

	function handleTabChange(_event, value) {
		setSelectedTab(value);
	}

	return (
		<>
			<Tabs
				value={selectedTab}
				variant="scrollable"
				onChange={handleTabChange}
				indicatorColor="secondary"
				textColor="secondary"
				scrollButtons="auto"
				classes={{
					root: ' h-44'
				}}
			>
				{listDivisi.map(divisi => (
					<Tab
						key={divisi.id}
						classes={{
							root: 'h-44 h3'
						}}
						label={divisi.nama}
					/>
				))}
			</Tabs>

			{listDivisi?.length > 0 && (
				<>
					<PegawaiTable divisi={listDivisi[selectedTab].id} />
					<PegawaiFooter divisi={listDivisi[selectedTab]} />
				</>
			)}
		</>
	);
}

export default PegawaiTabs;
