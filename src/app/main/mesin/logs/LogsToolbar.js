import React from 'react';
import { Button, Icon, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@material-ui/pickers';
import UsersAutoComplete from 'app/main/components/UsersAutoComplete';
import { refreshListLogs, setParamsListLogs } from '../store/logsSlice';

function LogsToolbar() {
  const dispatch = useDispatch();
  const { params } = useSelector(({ mesin }) => mesin.logs);
  const { data: dataMesin } = useSelector(({ mesin }) => mesin.form);
  const [userSelected, setUserSelected] = React.useState(null);

  const onUserChange = user => {
    setUserSelected(user);
    dispatch(setParamsListLogs({ ...params, page: 1, pin: user?.pin || '' }));
  };

  return (
    <div className="p-8 mr-0 w-full flex flex-wrap justify-between">
      <div className="flex flex-wrap items-center">
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<Icon>refresh</Icon>}
          onClick={() => dispatch(refreshListLogs())}
        >
          Refresh
        </Button>

        <div className="mx-8" />

        <UsersAutoComplete
          variant="outlined"
          className="min-w-224 p-0"
          label="User"
          size="small"
          value={userSelected}
          mesinId={dataMesin?.id}
          onChange={(_evt, val) => onUserChange(val)}
        />
      </div>

      <div className="flex flex-wrap items-center">
        <Typography className="mr-8">Filter : </Typography>
        <DatePicker
          autoOk
          style={{ width: '17.5rem' }}
          inputVariant="outlined"
          label="Tgl Awal"
          size="small"
          clearable
          invalidDateMessage="Tanggal tidak valid"
          format="DD-MM-YYYY"
          value={params.tglAwal || null}
          onChange={date =>
            dispatch(setParamsListLogs({ ...params, page: 1, tglAwal: date?.format('YYYY-MM-DD') || null }))
          }
        />

        <Typography className="mx-8">S/D</Typography>

        <DatePicker
          autoOk
          style={{ width: '17.5rem' }}
          inputVariant="outlined"
          label="Tgl Akhir"
          clearable
          size="small"
          invalidDateMessage="Tanggal tidak valid"
          format="DD-MM-YYYY"
          value={params.tglAkhir || null}
          onChange={date =>
            dispatch(setParamsListLogs({ ...params, page: 1, tglAkhir: date?.format('YYYY-MM-DD') || null }))
          }
        />
      </div>
    </div>
  );
}

export default LogsToolbar;
