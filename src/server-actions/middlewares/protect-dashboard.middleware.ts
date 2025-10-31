import { NextRequest, NextResponse } from "next/server";

//utils
import { getTokensFromRequest } from "./utils/get-tokens-from-request";
import { jwtVerifyServer } from "./utils/jwt-verify";
import { redirectToLoginOrErrorPage } from "./utils/redirect-to-login-or-404";


//Пользователь просто должен быть в системе (иметь токен)
export const protectDashboardPages = async (request: NextRequest) => {

	const tokens = await getTokensFromRequest(request);  //проверяем токены 
	if (!tokens) return redirectToLoginOrErrorPage(request); //есть нет токенов, то пропускаем человека дальше, доступна страница входа

	const verifiedData = await jwtVerifyServer(tokens.accessToken);
	if (!verifiedData) return redirectToLoginOrErrorPage(request); //есть нет данных токена, то пропускаем человека дальше, доступна страница входа


	return NextResponse.next(); //пропускаем дальше

}