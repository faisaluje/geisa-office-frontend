import { URL_API } from 'app/constants';
import ErrorService from 'app/services/error.service';
import Axios from 'axios';

class PenggunaService {
  static async getListPenggunaData(params) {
    try {
      const { data } = await Axios.get(`${URL_API}/pengguna`, {
        params,
        timeout: 30000
      });

      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        msg: e.response?.message || e.message || 'Gagal mengambil data pengguna'
      };
    }
  }

  static async createPengguna(data) {
    try {
      await Axios.post(`${URL_API}/pengguna`, data, { timeout: 30000 });

      return { success: true, data: 'Berhasil menyimpan' };
    } catch (e) {
      return {
        success: false,
        msg: ErrorService.getErrorMessage(e)
      };
    }
  }

  static async updatePengguna(id, data) {
    try {
      delete data.createdAt;
      delete data.updatedAt;

      await Axios.patch(`${URL_API}/pengguna/${id}`, data, { timeout: 30000 });

      return { success: true, data: 'Berhasil update data' };
    } catch (e) {
      return {
        success: false,
        msg: ErrorService.getErrorMessage(e)
      };
    }
  }

  static async getPenggunaById(penggunaId) {
    try {
      const { data } = await Axios.get(`${URL_API}/pengguna/${penggunaId}`, {
        timeout: 30000
      });

      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        msg: e.response?.message || e.message || 'Gagal mengambil data pengguna'
      };
    }
  }

  static async updatePassword(id, data) {
    try {
      await Axios.patch(`${URL_API}/pengguna/update-password/${id}`, data, { timeout: 30000 });

      return { success: true, data: 'Berhasil update password' };
    } catch (e) {
      return {
        success: false,
        msg: ErrorService.getErrorMessage(e)
      };
    }
  }
}

export default PenggunaService;
