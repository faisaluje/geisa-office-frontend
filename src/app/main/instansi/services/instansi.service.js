import { URL_API } from 'app/constants';
import ErrorService from 'app/services/error.service';
import Axios from 'axios';

class InstansiService {
	static async getInstansiData() {
		try {
			const { data } = await Axios.get(`${URL_API}/instansi`, {
				timeout: 30000
			});

			return { success: true, data };
		} catch (e) {
			return {
				success: false,
				msg: e.response?.message || e.message || 'Gagal mengambil data instansi'
			};
		}
	}

	static async updateInstansi(id, data) {
		try {
			delete data.createdAt;
			delete data.updatedAt;

			await Axios.patch(`${URL_API}/instansi/${id}`, data, { timeout: 30000 });

			return { success: true, data: 'Berhasil update data' };
		} catch (e) {
			return {
				success: false,
				msg: ErrorService.getErrorMessage(e)
			};
		}
	}
}

export default InstansiService;
