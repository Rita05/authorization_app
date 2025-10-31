'use server'

import { API_URL } from "@/constants";
import { IAuthResponse } from "@/services/auth/auth.service";


/**
 * Здесь автоматически не подвязываются куки, 
 * так как идет общение между сервером и сервером, а не между сервером и клиентом,
 * поэтому принудительно в headers указываем куки и прокидываем туда токен
 * @param {string} refreshToken
 * @return {*} 
 */
export const getNewTokensByRefresh = async (refreshToken: string) => {

	const response = await fetch(`${API_URL}'/auth/access-token'`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `refreshToken=${refreshToken}`
		},
		credentials: 'include'
	})

	if (!response.ok) {
		throw new Error('Failed to fetch new tokens');
	}

	const data: IAuthResponse = await response.json();
	return data;
}

