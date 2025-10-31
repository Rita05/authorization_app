'use client'

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTransition } from 'react';
import Image from 'next/image';

import defaultAvatar from '../../../../public/default-avatar.svg';

//components
import { Button } from "@/components/ui/Button";

//hooks
import { useProfile } from "@/hooks/useProfile";

//api
import authService from "@/services/auth/auth.service";

//routes
import { PUBLIC_PAGES } from "@/config/pages/public.config";
import { MiniLoader } from "@/components/ui/MiniLoader";

export const ProfileInfo = () => {

	const router = useRouter();

	const { user, isLoading, refetch } = useProfile();

	const { avatarPath, email, name, verificationToken, rights } = user;
	console.log('verificationToken: ', verificationToken);


	//Для формы выхода из системы, при нажатии на кнопку logOut
	const [isPending, startTransition] = useTransition();

	/* 
	 Так как refreshToken цепляется как серверная кука, мы не можем ее на клиенте очистить, 
	 а только отправить запрос на сервер, сервер отправит пустой куки на клиент как accessToken
	 */

	const { mutate: mutateLogOut, isPending: isLogOutPending } = useMutation({
		mutationKey: ['logOut'],
		mutationFn: () => authService.logOut(),
		onSuccess() {
			refetch();
			startTransition(() => {
				router.push(PUBLIC_PAGES.LOGIN); //плавный переход на страницу логина
			})
		}
	})

	const isLogOutLoading = isLogOutPending || isPending;

	if (isLoading) {
		return (
			<MiniLoader
				isDark
				width={150}
				height={150}
				className="h-screen flex items-center justify-center"
			/>
		)
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="flex flex-col items-center p-6 rounded-lg w-[350px]" style={{ boxShadow: "0 1px 3px -2px rgba(0, 0, 0, .2), 0 1px 1px rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12" }}>
				<Image
					src={avatarPath || defaultAvatar}
					alt="AvatarIcon"
					width={70}
					height={70}
					className="rounded-full object-cover border-[4px]"
					style={{ boxShadow: "0 1px 3px -2px rgba(0, 0, 0, .2), 0 1px 1px rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12" }}
				/>
				<span className="text-xl font-bold mt-2">Hi, {name || 'Anonym'}</span>
				<div className="h-[1px] w-full bg-[#dce1e6] mt-[20px]"></div>
				<p className="text-base mt-4">
					<span className="whitespace-nowrap">
						<strong className="text-lg">Ваш email: </strong>
						{email}
					</span>
					<br />
					<i className="text-sm mt-2">
						{/* Подтверждение профиля */}
						({verificationToken ? 'Requires email verification' : 'Verified'})
					</i>
				</p>
				<p className="text-base mt-4 self-start">
					<strong className="text-lg">Права: </strong>
					{rights?.join(', ')}
				</p>
				<div className="h-[1px] w-full bg-[#dce1e6] mt-[20px]"></div>
				<Button
					onClick={() => mutateLogOut()}
					className="text-base mt-4 self-start bg-[#1a5dd0] p-2 text-white font-semibold rounded transition duration-500 ease-in-out cursor-pointer"
				>
					{isLogOutLoading ? <MiniLoader className="flex self-center" /> : 'Выйти'}
				</Button>
			</div>
		</div>
	)
}

