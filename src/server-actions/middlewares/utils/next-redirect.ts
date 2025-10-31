import { NextResponse } from "next/server";

//Оборачиваем в URL, так как это требование для редиректа в next и в middleware у next
export const nextRedirect = (targetUrl: string | URL, currentUrl: string | URL) => {
	return NextResponse.redirect(new URL(targetUrl, currentUrl));
}