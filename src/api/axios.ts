import axios, { CreateAxiosDefaults } from 'axios';
import { API_URL } from '@/constants';
import { errorCatch, getContentType } from './api.helper';
import authTokenService from '@/services/auth/auth-token.service';
import authService from '@/services/auth/auth.service';

//withCredentials означает что все куки от нашего браузера будут привязываться к запросу для обмена с бэком

const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentType(),
	withCredentials: true
}

//Для всех публичных страниц
export const axiosClassic = axios.create(axiosOptions);

//для прикрепления accesToken к запросам, для частных страниц, для авторизованных пользователей
export const instance = axios.create(axiosOptions);


//привязка accesToken к запросу в заголовок самого запроса
instance.interceptors.request.use(config => {
	const accessToken = authTokenService.getAccessToken();

	if (config?.headers && accessToken) {
		//Bearer обязательно для работы с jwt токенами 
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
})

//принимает 2 колбэка, отлавливание ошибки бесшумно
instance.interceptors.response.use(response => response, async error => {
	const originalRequest = error.config;

	//Проверка всех возможных ошибок сервера
	if (
		(error.response.status === 401 ||
			errorCatch(error) === 'jwt expired' ||
			errorCatch(error) === 'jwt must be provided'
		)
		&& error.config
		&& error.config._isRetry
	) {
		originalRequest._isRetry = true; //уже произвели запрос, чтобы он не зациклился 

		try {
			await authService.getNewTokens();
			return instance.request(originalRequest); //повторяем тот запрос, который не прошел из-за просроченного токена
		} catch (error) {
			if (
				//если при запросе в ответе на refresh token возникла ошибка, то полностью выходим из системы
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'Refresh token not passed'
			) {
				authTokenService.removeAccessToken();
			}
		}
	}

	//для тех ошибок, которые не относятся к ошибкам выше, возвращаем ошибку
	throw error;
})


