import { NextRequest } from "next/server";


//routes
import { ADMIN_PAGES } from "@/config/pages/admin.config";
import { nextRedirect } from "./next-redirect";
import { PUBLIC_PAGES } from "@/config/pages/public.config";

/**
 * 
 * Проверяет, если администраторская сторона, то переадрисовываем на страницу ошибки, 
 * а иначе на страницу входа, чтобы любой злоумышленник не мог получить доступ к части администрирования 
 */
export const redirectToLoginOrErrorPage = (request: NextRequest) => {
	const pathname = request.nextUrl.pathname;
	const isAdminPage = pathname.includes(ADMIN_PAGES.HOME) || pathname.includes(ADMIN_PAGES.MANAGER);

	return nextRedirect(isAdminPage ? '404' : PUBLIC_PAGES.LOGIN, request.url)
}