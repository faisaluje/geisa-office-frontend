import { URL_API } from 'app/constants';
import Axios from 'axios';

class UsersService {
	static async getListUsersData(id, params) {
		try {
			const { data } = await Axios.get(`${URL_API}/mesin-users/${id}`, {
				params,
				timeout: 30000
			});

			return { success: true, data };
		} catch (e) {
			return {
				success: false,
				msg: e.response?.message || e.message || 'Gagal mengambil data users'
			};
		}
	}
}

export default UsersService;
