/* eslint-disable radix */
import React from 'react';
import { Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import { startCase } from 'lodash';
import { setParamsListPengguna } from './store/tableSlice';

function PenggunaFooter() {
  const dispatch = useDispatch();
  const { data, params } = useSelector(({ pengguna }) => pengguna.table);

  const handleChange = (_event, page) => {
    dispatch(setParamsListPengguna({ ...params, page }));
  };

  return (
    <Paper elevation={3} className="flex flex-wrap p-8 justify-center w-full bg-gray-50">
      <div className="flex flex-1 items-center font-bold">
        Total Pengguna {startCase(params?.status || 'aktif')} : {data?.meta?.totalItems}
      </div>

      <div className="flex mt-12 sm:mt-0">
        {data?.meta?.totalPages && (
          <Pagination
            count={data.meta.totalPages}
            page={parseInt(data.meta.currentPage)}
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        )}
      </div>
    </Paper>
  );
}

export default PenggunaFooter;
