'use server'

import { NextRequest } from "next/server";

//utils
import { getNewTokensByRefresh } from "./get-new-tokens-by-refresh";

//types
import { AuthToken } from "@/types/auth.types";

/* 
* Получение accessToken и refreshToken, чтобы понять, какая роль у пользователя, 
* до какой страницы имеет доступ
*
*/

export const getTokensFromRequest = async (request: NextRequest) => {
	const refreshToken = request.cookies.get(AuthToken.REFRESH_TOKEN)?.value;
	let accessToken = request.cookies.get(AuthToken.ACCESS_TOKEN)?.value;


	//Если нет refreshToken, то сразу выходим из системы
	if (!refreshToken) {
		request.cookies.delete(AuthToken.ACCESS_TOKEN); //на всякий случай
		return null
	}

	if (!accessToken) {
		try {
			//перезаписываем accessToken, переобновляем, если закончился и чтобы не перекрывать доступ к странице, так как по роли он у него есть
			const data = await getNewTokensByRefresh(refreshToken);
			accessToken = data.accessToken;
		} catch (error) {
			//Выводим человека из системы 
			if (error instanceof Error) {
				if (error.message === 'invalid token') {
					console.log('не валидный токен');
					request.cookies.delete(AuthToken.ACCESS_TOKEN);
					return null;
				}
			}
			return null;
		}
	}

	return { accessToken, refreshToken };
}

