import Cookies from "js-cookie";

//types
import { AuthToken } from "@/types/auth.types";

class AuthTokenService {
	getAccessToken() {
		const accessToken = Cookies.get(AuthToken.ACCESS_TOKEN);
		return accessToken || null;
	}

	//кука заканчивается через 1 день, защита на конкретном домене 
	saveAccessToken(accessToken: string) {
		Cookies.set(AuthToken.ACCESS_TOKEN, accessToken, {
			domain: 'localhost',
			sameSite: 'strict',
			expires: 1
		});
	}

	removeAccessToken() {
		Cookies.remove(AuthToken.ACCESS_TOKEN);
	}
}

export default new AuthTokenService();

