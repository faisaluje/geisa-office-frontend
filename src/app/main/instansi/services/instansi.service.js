const { default: Axios } = require('axios');
const { URL_API } = require('../../../constants');

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
}

export default InstansiService;
