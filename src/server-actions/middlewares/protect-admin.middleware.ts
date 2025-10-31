
import { ADMIN_PAGES } from "@/config/pages/admin.config";
import { NextRequest, NextResponse } from "next/server";

//utils
import { getTokensFromRequest } from "./utils/get-tokens-from-request";
import { jwtVerifyServer } from "./utils/jwt-verify";
import { redirectToLoginOrErrorPage } from "./utils/redirect-to-login-or-404";


//Пользователь просто должен быть в системе (иметь токен)
export const protectAdminPages = async (request: NextRequest) => {

	const tokens = await getTokensFromRequest(request);  //проверяем токены 
	if (!tokens) return redirectToLoginOrErrorPage(request); //есть нет токенов, то пропускаем человека дальше, доступна страница входа

	const verifiedData = await jwtVerifyServer(tokens.accessToken);
	if (!verifiedData) return redirectToLoginOrErrorPage(request); //есть нет данных токена, то пропускаем человека дальше, доступна страница входа

	const pathname = request.nextUrl.pathname;


	//Проверка, если это админская часть и пользователь не является администратором, то редеректим на страницу логина
	if (pathname.startsWith(ADMIN_PAGES.HOME) && !verifiedData?.isAdmin) {
		return redirectToLoginOrErrorPage(request);
	}

	//Проверка, если это менеджерская часть и пользователь не является администратором, то редеректим на страницу логина
	if (
		pathname.startsWith(ADMIN_PAGES.MANAGER) &&
		!verifiedData?.isAdmin &&
		!verifiedData?.isManager
	) {
		return redirectToLoginOrErrorPage(request);
	}

	return NextResponse.next(); //пропускаем дальше

}