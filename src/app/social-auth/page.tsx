import { Suspense } from "react";

//components
import { SocialAuthRedirectPage } from "./SocialAuthRedirectPage";

//Помещает accessToken в query параметры и возвращает с бэкенда 
const SocialAuthPage = () => {
	return (
		<Suspense>
			<SocialAuthRedirectPage />
		</Suspense>
	)
}

export default SocialAuthPage;