import { URL_API } from 'app/constants';
import Axios from 'axios';

class LogsService {
	static async getListLogsData(sn, params) {
		try {
			const { data } = await Axios.get(`${URL_API}/mesin-logs/${sn}`, {
				params,
				timeout: 30000
			});

			return { success: true, data };
		} catch (e) {
			return {
				success: false,
				msg: e.response?.message || e.message || 'Gagal mengambil data logs'
			};
		}
	}
}

export default LogsService;
