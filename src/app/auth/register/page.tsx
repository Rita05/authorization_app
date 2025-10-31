import { Metadata } from "next"

//components
import { AuthPage } from "../AuthPage";

export const metadata: Metadata = {
	title: 'Register'
}

const RegisterPage = () => {
	return (
		<AuthPage isLogin={false} />
	)
}

export default RegisterPage;