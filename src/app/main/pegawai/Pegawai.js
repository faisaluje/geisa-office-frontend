import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import PegawaiToolbar from './PegawaiToolbar';
import reducer from './store';
import PegawaiDialog from './PegawaiDialog';
import PegawaiTable from './PegawaiTable';
import PegawaiFooter from './PegawaiFooter';
import { exitListPegawai } from './store/tableSlice';

function Pegawai() {
  const dispatch = useDispatch();
  const { isError, msg } = useSelector(({ pegawai }) => pegawai.table);

  React.useEffect(() => {
    return () => dispatch(exitListPegawai());
  }, [dispatch]);

  return (
    <>
      <PegawaiDialog />
      <Paper className="flex flex-col w-full mb-16 sm:mb-0 p-16 rounded-8 border-1 sm:h-full overflow-hidden">
        <PegawaiToolbar />
        {isError && (
          <Paper className="h-68 bg-red-200 flex items-center justify-center">
            <Typography className="font-bold m-0">{msg}</Typography>
          </Paper>
        )}
        {/* <PegawaiTabs /> */}
        <PegawaiTable />
        <PegawaiFooter />
      </Paper>
    </>
  );
}

export default withReducer('pegawai', reducer)(Pegawai);
