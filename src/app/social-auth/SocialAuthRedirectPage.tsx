'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

//components
import { SocialEmailForm } from "./SocialEmailForm";
import { MiniLoader } from "@/components/ui/MiniLoader";

//api
import authTokenService from "@/services/auth/auth-token.service";

//routes
import { PUBLIC_PAGES } from "@/config/pages/public.config";

//types
import { AuthToken } from "@/types/auth.types";


export const SocialAuthRedirectPage = () => {

	const searchParams = useSearchParams();
	const needEmail = searchParams.get('needEmail'); //если пользователь вошел через telegram, sms или email

	const router = useRouter();

	//Получаем accessToken из query параметров
	useEffect(() => {
		const accessToken = searchParams.get(AuthToken.ACCESS_TOKEN);
		if (accessToken) authTokenService.saveAccessToken(accessToken); //после происходит обычный вход в систему 

		if (!needEmail) router.replace(PUBLIC_PAGES.HOME); //если уже есть email, то перекидываем пользователя на главную страницу 
	}, [])

	if (needEmail) {
		return <SocialEmailForm />
	}

	return (
		<div className="flex items-center justify-center h-screen">
			<MiniLoader
				width={150}
				height={150}
			/>
		</div>
	)
}