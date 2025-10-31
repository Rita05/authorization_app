'use client'

import { useState, type FormEvent } from 'react'
import { twMerge } from 'tailwind-merge'

//hooks
import { useEmailForm } from './useEmailForm';

//components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MiniLoader } from '@/components/ui/MiniLoader';
import { AuthPageWrapper } from '../auth/AuthPageWrapper';

//styles
import styles from '../auth/form/AuthForm.module.scss'


/**
 * Форма для добавления email к пользователю, если он авторизовался/зарегистрировался не с email
 * @returns 
 */
export const SocialEmailForm = () => {
	const [email, setEmail] = useState('')
	const { updateEmail, isLoading } = useEmailForm()

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		updateEmail(email)
	}

	return (
		<AuthPageWrapper heading={'Provide Your Email'}>
			<form
				onSubmit={handleSubmit}
				className="space-y-4"
			>
				<div>
					<label className="block text-gray-600">Email</label>
					<Input
						type="email"
						value={email}
						placeholder="Enter email:"
						onChange={e => setEmail(e.target.value)}
						required
						className={styles['input-field']}
					/>
				</div>

				<div>
					<Button
						type="submit"
						className={twMerge(
							styles['btn-primary'],
							'bg-primary',
							isLoading && 'opacity-75 cursor-not-allowed'
						)}
						disabled={isLoading}
					>
						{isLoading ? <MiniLoader /> : 'Submit'}
					</Button>
				</div>
			</form>
		</AuthPageWrapper>
	)
}
