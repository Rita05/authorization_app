import { NextRequest, NextResponse } from "next/server";

//routes
import { PUBLIC_PAGES } from "./config/pages/public.config";
import { ADMIN_PAGES } from "./config/pages/admin.config";
import { DASHBOARD_PAGES } from "./config/pages/dashboard.config";
import { PREMIUM_PAGES } from "./config/pages/premium.config";

//actions
import { protectLoginPages } from "./server-actions/middlewares/protect-login.middleware";
import { protectPremiumPages } from "./server-actions/middlewares/protect-premium.middleware";
import { protectDashboardPages } from "./server-actions/middlewares/protect-dashboard.middleware";
import { protectAdminPages } from "./server-actions/middlewares/protect-admin.middleware";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	//на каком пути мы сейчас находимся 
	const pathname = request.nextUrl.pathname;

	/**
	* Проверка, чтобы авторизованный пользователь не попадал на страницу входа снова,
	* защищает страницу входа
	*/

	if (pathname.startsWith(PUBLIC_PAGES.AUTH)) {
		console.log('Public page auth');
		return protectLoginPages(request);
	}

	if (pathname.startsWith(PREMIUM_PAGES.HOME)) {
		console.log('Premium page home');
		return protectPremiumPages(request);
	}

	if (
		pathname.startsWith(ADMIN_PAGES.HOME) ||
		pathname.startsWith(ADMIN_PAGES.MANAGER)
	) {
		console.log('Admin Page home or manager');
		return protectAdminPages(request);
	}

	if (pathname.startsWith(DASHBOARD_PAGES.HOME)) {
		console.log('DashBoard page home');
		return protectDashboardPages(request);
	}
	return NextResponse.next();
}

//указываем страницы, на которых будет срабатывать middleware 
export const config = {
	matcher: [
		'/dashboard/:path*',
		'/auth/:path*',
		'/premium/:path*',
		'/admin/:path*',
		'/manager/:path*'
	]
}

