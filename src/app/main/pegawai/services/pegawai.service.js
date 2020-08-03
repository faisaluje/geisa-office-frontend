import { URL_API } from 'app/constants';
import ErrorService from 'app/services/error.service';
import Axios from 'axios';

class PegawaiService {
	static async getListPegawaiData(params) {
		try {
			const { data } = await Axios.get(`${URL_API}/pegawai`, {
				params,
				timeout: 30000
			});

			return { success: true, data };
		} catch (e) {
			return {
				success: false,
				msg: e.response?.message || e.message || 'Gagal mengambil data pegawai'
			};
		}
	}

	static async createPegawai(data) {
		try {
			await Axios.post(`${URL_API}/pegawai`, data, { timeout: 30000 });

			return { success: true, data: 'Berhasil menyimpan' };
		} catch (e) {
			return {
				success: false,
				msg: ErrorService.getErrorMessage(e)
			};
		}
	}

	static async updatePegawai(id, data) {
		try {
			delete data.createdAt;
			delete data.updatedAt;

			await Axios.patch(`${URL_API}/pegawai/${id}`, data, { timeout: 30000 });

			return { success: true, data: 'Berhasil update data' };
		} catch (e) {
			return {
				success: false,
				msg: ErrorService.getErrorMessage(e)
			};
		}
	}
}

export default PegawaiService;
