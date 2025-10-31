'use client'

import { useRef, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ReCAPTCHA from 'react-google-recaptcha';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";


//routes
import { PUBLIC_PAGES } from "@/config/pages/public.config";

//types
import { IFormData } from "@/types/auth.types";
import authService from "@/services/auth/auth.service";


export const useAuthForm = (isLogin: boolean) => {
	const { register, handleSubmit, reset, setValue } = useForm<IFormData>();

	// Для переадрисации пользователя после успешного входа 
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const handleError = (error: unknown) => {
		if (axios.isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else if (error instanceof Error) {
			toast.error(error.message || 'An error occured');
		} else {
			toast.error('An unknown error occurred');
		}
	}

	const handleSuccess = () => {
		startTransition(() => {
			//очистка формы после входа/регистрации
			reset();
			//переадресация на главную страницу
			router.push(PUBLIC_PAGES.HOME);
		})
	}

	//Функция для запуска запроса и его выполнения, состояние вторым аргументом идет
	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IFormData) => authService.main('login', data, recaptchaRef.current?.getValue()),
		onSuccess: handleSuccess,
		onError: handleError
		// onSuccess() {
		// 	startTransition(() => {
		// 		//очистка формы после входа в систему
		// 		reset();
		// 		//переадресация на главную страницу
		// 		router.push(PUBLIC_PAGES.HOME);
		// 	})
		// },
		// onError(error) {
		// 	if (axios.isAxiosError(error)) {
		// 		toast.error(error.response?.data.message);
		// 	}
		// }
	})

	//Фунцкия для выполнения запроса на регистрацию в системе, состояние вторым аргументом 
	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IFormData) => authService.main('register', data, recaptchaRef.current?.getValue()),
		onSuccess: handleSuccess,
		onError: handleError
		// onSuccess() {
		// 	startTransition(() => {
		// 		//очистка формы после регистрации в системе
		// 		reset();
		// 		//переадресация на главную страницу
		// 		router.push(PUBLIC_PAGES.HOME);
		// 	})
		// },
		// onError(error) {
		// 	if (axios.isAxiosError(error)) {
		// 		toast.error(error.response?.data.message);
		// 	}
		// }
	})

	//Функция, которая выполняется при отправке react-hook-form и вызове метода либо на логин, либо на регистрацию
	const onSubmit: SubmitHandler<IFormData> = (data) => {
		console.log('data: ', data);
		const token = recaptchaRef.current?.getValue();
		if (!token) {
			toast.error('Please complete the recaptcha');
			return;
		}

		isLogin ? mutateLogin(data) : mutateRegister(data);
	}

	const isLoading = isPending || isLoginPending || isRegisterPending;

	return {
		register,
		onSubmit,
		setValue,
		handleSubmit,
		recaptchaRef,
		isLoading
	};
}

