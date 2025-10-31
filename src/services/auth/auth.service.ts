/*
В сервисы вынеси все запросы чтобы отделить бизнес-логику от ui
К примеру, чтобы в хуках не было тех же запросов
*/
import { axiosClassic } from "@/api/axios";

//types
import { IFormData } from "@/types/auth.types";
import { IUser } from "@/types/user.types";
import authTokenService from "./auth-token.service";


export interface IAuthResponse {
	user: IUser
	accessToken: string
}

class AuthService {

	//общий метод запроса на регистрацию или логин 
	async main(
		type: 'login' | 'register',
		data: IFormData,
		recaptchaToken?: string | null
	) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data,
			{
				headers: {
					recaptcha: recaptchaToken
				}
			}
		);

		if (response.data.accessToken) {
			authTokenService.saveAccessToken(response.data.accessToken);
		}
		return response;
	}

	//переобновление токенов на фронтенде, переобновляется за счет того, что в сервеных куках уже лежит refresh токен 
	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>('/auth/access-token');

		if (response.data.accessToken) {
			authTokenService.saveAccessToken(response.data.accessToken);
		}

		return response;
	}

	//переобновление токенов на бэкенде, в middleweare
	// async getNewTokensByRefresh(refreshToken: string) {
	// 	const response = await axiosClassic.post<IAuthResponse>(
	// 		'/auth/access-token',
	// 		{},
	// 		{
	// 			headers: {
	// 				Cookie: `refreshToken=${refreshToken}`
	// 			}
	// 		}
	// 	)
	// 	return response;
	// }

	//Запрос на очистку серверных кук, бэкенд присылает пустые куки
	async logOut() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) authTokenService.removeAccessToken();

		return response;
	}
}

export default new AuthService();


