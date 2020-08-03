import { URL_API } from 'app/constants';
import Axios from 'axios';

class DivisiService {
	static async getListDivisi() {
		try {
			const { data } = await Axios.get(`${URL_API}/divisi`, {
				timeout: 30000
			});

			return { success: true, data };
		} catch (e) {
			if (e.response?.status === 404) {
				return { success: true, data: [] };
			}

			return {
				success: false,
				msg: e.response?.message || e.message || 'Gagal mengambil data divisi'
			};
		}
	}

	static async getListDivisiByPegawai() {
		try {
			const { data } = await Axios.get(`${URL_API}/divisi/pegawai`, {
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
}

export default DivisiService;
