import { URL_API } from 'app/constants';
import Axios from 'axios';

class JabatanService {
	static async getListJabatan() {
		try {
			const { data } = await Axios.get(`${URL_API}/jabatan`, {
				timeout: 30000
			});

			return { success: true, data };
		} catch (e) {
			if (e.response?.status === 404) {
				return { success: true, data: [] };
			}

			return {
				success: false,
				msg: e.response?.message || e.message || 'Gagal mengambil data jabatan'
			};
		}
	}
}

export default JabatanService;
