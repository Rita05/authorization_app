
import { Metadata } from "next"

//components
import { AuthPage } from "../AuthPage";

export const metadata: Metadata = {
	title: 'Login'
}

const LoginPage = () => {
	return (
		<AuthPage isLogin />
	)
}

export default LoginPage;