import { useRouter } from "next/navigation";

//components
import { Button } from "@/components/ui/Button";
import { PUBLIC_PAGES } from "@/config/pages/public.config";


interface Props {
	isLogin: boolean
}

export const AuthToogle = (props: Props) => {
	const { isLogin } = props;

	const router = useRouter();

	return (
		<div className="text-center text-base mt-3">
			{isLogin ? (
				<p className="text-base whitespace-nowrap w-full">
					У вас нет аккаунта?{' '}
					<Button
						type='button'
						className="text-[#1a5dd0] text-base cursor-pointer"
						onClick={() => router.push(PUBLIC_PAGES.REGISTER)}
					>
						{'Зарегистрироваться'}
					</Button>
				</p>
			) : (
				<p className="text-base whitespace-nowrap w-full">
					Уже есть аккаунт?{' '}
					<Button
						type="button"
						className="text-[#1a5dd0] text-base cursor-pointer"
						onClick={() => router.push(PUBLIC_PAGES.LOGIN)}
					>
						{'Войти'}
					</Button>
				</p>
			)
			}
		</div >
	)
}