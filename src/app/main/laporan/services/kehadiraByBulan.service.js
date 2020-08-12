/* eslint-disable no-restricted-syntax */
import LogsService from 'app/main/mesin/services/logs.service';
import PegawaiService from 'app/main/pegawai/services/pegawai.service';

class KehadiranByBulanService {
  static async getListKehadiranByBulan(params) {
    const listPegawai = await PegawaiService.getListPegawaiData(params);
    const listKehadiran = await LogsService.getListLogsAll(params);

    return {
      listPegawai: !listPegawai.data || listPegawai.data.items?.length < 1 ? [] : listPegawai.data.items,
      listKehadiran: listKehadiran.data || []
    };
  }
}

export default KehadiranByBulanService;
