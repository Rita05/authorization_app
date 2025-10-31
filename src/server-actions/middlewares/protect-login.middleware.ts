import { DASHBOARD_PAGES } from "@/config/pages/dashboard.config";
import { NextRequest, NextResponse } from "next/server"

//utils
import { getTokensFromRequest } from "./utils/get-tokens-from-request";
import { jwtVerifyServer } from "./utils/jwt-verify";
import { nextRedirect } from "./utils/next-redirect";


export const protectLoginPages = async (request: NextRequest) => {
	const tokens = await getTokensFromRequest(request);
	if (!tokens) return NextResponse.next(); //есть нет токенов, то пропускаем человека дальше, доступна страница входа

	const verifiedData = await jwtVerifyServer(tokens.accessToken);
	if (!verifiedData) return NextResponse.next(); //есть нет данных токена, то пропускаем человека дальше, доступна страница входа

	//значит что человек авторизован в системе и пропускаем его дальше на страницу профиля или куда угодно
	return nextRedirect(DASHBOARD_PAGES.PROFILE, request.url);
}
