import { URL_API } from 'app/constants';
import ErrorService from 'app/services/error.service';
import Axios from 'axios';

class UsersService {
	static async getListUsersData(mesinId, params) {
		try {
			const { data } = await Axios.get(`${URL_API}/mesin-users/${mesinId}`, {
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

	static async createUser(data) {
		try {
			await Axios.post(`${URL_API}/mesin-users`, data, { timeout: 30000 });

			return { success: true, data: 'Berhasil menyimpan' };
		} catch (e) {
			return {
				success: false,
				msg: ErrorService.getErrorMessage(e)
			};
		}
	}

	static async updateUser(id, data) {
		try {
			delete data.createdAt;
			delete data.updatedAt;

			await Axios.patch(`${URL_API}/mesin-users/${id}`, data, { timeout: 30000 });

			return { success: true, data: 'Berhasil update data' };
		} catch (e) {
			return {
				success: false,
				msg: ErrorService.getErrorMessage(e)
			};
		}
	}
}

export default UsersService;
