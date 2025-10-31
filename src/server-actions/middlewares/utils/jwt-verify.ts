'use server'

import * as jose from 'jose';

//utils
import { transformUser } from '@/utils/transform-user';

//types
import { ITokenInside } from '@/types/auth.types';

/**
 * Вторая функция для распознавания токена и его расшифровки и получение данных о пользователе(его правах), 
 * чтобы потом выдать ему доступ к странице или наоборот запретить с помощью jwt 
 * 
 */
export const jwtVerifyServer = async (accessToken: string) => {
	try {
		const { payload }: { payload: ITokenInside } = await jose.jwtVerify(
			accessToken,
			new TextEncoder().encode(`${process.env.JWT_SECRET}`)
		)
		if (!payload) return null;

		return transformUser(payload); //возвращаем все, что находится внутри токена и преобразовываем в удобный формат
	} catch (error) {
		//Обработка ошибок в случае верификации JWT
		if (error instanceof Error &&
			error.message.includes('exp claim timestamp check failed')
		) {
			console.log('Токен истек');
			return null;
		}
		console.log('Ошибка при верификации токена', error);
		return null;
	}

}


