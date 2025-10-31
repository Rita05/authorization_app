'use client'
import ReCAPTCHA from 'react-google-recaptcha';
import { twMerge } from 'tailwind-merge';

//components 
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MiniLoader } from '@/components/ui/MiniLoader';
import { AuthToogle } from './AuthToogle';
import { SocialMediaButtons } from './socials/SocialMediaButtons';

//hooks
import { useAuthForm } from './useAuthForm';

//styles
import styles from './AuthForm.module.scss';
import { IFormData } from '@/types/auth.types';


interface Props {
	isLogin: boolean
}

export const AuthForm = (props: Props) => {
	const { isLogin } = props;

	const {
		handleSubmit,
		onSubmit,
		register,
		setValue,
		recaptchaRef,
		isLoading
	} = useAuthForm(isLogin);

	const handleInputClear = (fieldName: keyof IFormData) => {
		setValue(fieldName, '');
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='w-[350px] mx-auto flex flex-col'>
			<Input
				type='email'
				placeholder='Введите email'
				labelText='Email'
				isClearable
				className={`${styles["input-field"]} p-[3px] rounded-lg outline-none border border-[#e0e0e0] h-[35px] w-full pr-8`}
				onClear={() => handleInputClear('email')}
				{...register('email')}
			/>
			<Input
				type='password'
				placeholder='Введите пароль'
				labelText='Password'
				isClearable
				className={`${styles["input-field"]} p-[3px] rounded-lg outline-none border border-[#e0e0e0] min-h-[35px] w-full pr-8`}
				onClear={() => handleInputClear('password')}
				{...register('password')}
			/>
			<div className='flex justify-center mx-auto w-[280px] scale-[1.15]'>
				<ReCAPTCHA
					ref={recaptchaRef}
					size="normal"
					theme='light'
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
					className={styles["recaptcha"]}
					style={{ marginTop: '20px' }}
					hl="ru"
				/>
			</div>
			<Button
				type='submit'
				className={twMerge(
					'bg-[#1a5dd0] cursor-pointer text-lg flex justify-center',
					styles['btn-primary'],
					isLoading && 'opacity-75 cursor-not-allowed',
				)}
				disabled={isLoading}
			>
				{isLoading ? <MiniLoader /> : isLogin ? 'Войти' : 'Зарегистрироваться'}
			</Button>
			<SocialMediaButtons />
			<AuthToogle isLogin={isLogin} />
		</form>
	)
}