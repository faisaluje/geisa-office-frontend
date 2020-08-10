/* eslint-disable no-restricted-syntax */
import LogsService from 'app/main/mesin/services/logs.service';
import { groupBy, maxBy, minBy, sortBy } from 'lodash';
import moment from 'moment';

class KehadiranByPegawaiService {
  static groupingKehadiranByDate(listKehadiran) {
    const sorted = sortBy(listKehadiran, 'time');
    const grouping = groupBy(sorted, data => moment(data.time).format('YYYY-MM-DD'));

    const result = [];
    for (const [key, value] of Object.entries(grouping)) {
      result.push({
        tgl: moment(key).date(),
        masuk: minBy(value, 'time'),
        pulang: maxBy(value, 'time')
      });
    }

    return result;
  }

  static async getListKehadiranByPegawai(params) {
    delete params.pegawai;

    const listKehadiran = await LogsService.getListLogsData(params);
    if (!listKehadiran.data || listKehadiran.data.items?.length < 1) {
      return [];
    }

    const groupingKehadiranByDate = this.groupingKehadiranByDate(listKehadiran.data.items);

    return groupingKehadiranByDate;
  }
}

export default KehadiranByPegawaiService;
