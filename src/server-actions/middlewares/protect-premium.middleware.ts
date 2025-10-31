import { NextRequest, NextResponse } from "next/server";

//routes
import { DASHBOARD_PAGES } from "@/config/pages/dashboard.config";
import { PREMIUM_PAGES } from "@/config/pages/premium.config";

//utils
import { getTokensFromRequest } from "./utils/get-tokens-from-request";
import { nextRedirect } from "./utils/next-redirect";
import { jwtVerifyServer } from "./utils/jwt-verify";
import { PUBLIC_PAGES } from "@/config/pages/public.config";
import { redirectToLoginOrErrorPage } from "./utils/redirect-to-login-or-404";


//Дробим middleware на мелкие сущности, чтобы из размер был маленьким, это важно для улучшения производительности
//После сборки итоговый middleware не будет большим 
export const protectPremiumPages = async (request: NextRequest) => {

	const tokens = await getTokensFromRequest(request);  //проверяем токены 
	if (!tokens) return redirectToLoginOrErrorPage(request); //есть нет токенов, то пропускаем человека дальше, доступна страница входа

	const verifiedData = await jwtVerifyServer(tokens.accessToken);
	if (!verifiedData) return redirectToLoginOrErrorPage(request); //есть нет данных токена, то пропускаем человека дальше, доступна страница входа

	//Если пользователь не является premium-user(у него нет подписки), переадрисовываем его на страницу планов(тарифов)
	if (!verifiedData?.isPremium) {
		return nextRedirect(PUBLIC_PAGES.PLANS, request.url);
		// return NextResponse.redirect(new URL(PUBLIC_PAGES.PLANS, request.url));
	}

	return NextResponse.next(); //пропускаем дальше, если у человека есть подписка

}