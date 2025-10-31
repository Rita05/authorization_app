import { instance } from "@/api/axios";

//types
import { IUser } from "@/types/user.types";


//Класс запросов для профиля пользователя, возвращающий Promise
class UserService {

	private _BASE_URL = '/users';

	async getProfile() {
		return instance.get<IUser>(`${this._BASE_URL}/profile`);
	}

	async getPremium() {
		return instance.get<{ text: string }>(`${this._BASE_URL}/premium`);
	}

	async getManagerContent() {
		return instance.get<{ text: string }>(`${this._BASE_URL}/manager`);
	}

	async getUsersList() {
		return instance.get<IUser[]>(`${this._BASE_URL}/list`);
	}

	async updateUserEmail(email: string) {
		return instance.patch(`${this._BASE_URL}/update-email`, { email });
	}
}

export default new UserService();