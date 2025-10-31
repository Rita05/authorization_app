
//components
import { AuthPageWrapper } from "./AuthPageWrapper";
import { AuthForm } from "./form/AuthForm";


interface Props {
	isLogin: boolean
}

export const AuthPage = (props: Props) => {
	const { isLogin } = props;

	return (
		<AuthPageWrapper heading={isLogin ? 'Войти' : 'Зарегистрироваться'}>
			<AuthForm isLogin={isLogin} />
		</AuthPageWrapper>
	)
}