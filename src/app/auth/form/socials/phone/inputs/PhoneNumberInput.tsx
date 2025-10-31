'use client'

import { twMerge } from "tailwind-merge"

//components
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { MiniLoader } from "@/components/ui/MiniLoader"

interface Props {
	type: 'sms' | 'whatsapp'
	phone: string
	isLoading: boolean
	setPhone: (phone: string) => void
	onSubmit: () => void
}

export const PhoneNumberInput = (props: Props) => {
	const {
		type,
		phone,
		setPhone,
		onSubmit,
		isLoading,
	} = props;
	return (
		<div className="">
			<Input
				type="tel"
				value={phone}
				onChange={e => setPhone(e.target.value)}
				placeholder="+1 123 456 7890"
				className={twMerge(
					'w-full p-3 border border-gray-500 rounded bg-transparent text-white text-lg focus:outline-none',
					type === 'whatsapp'
						? 'focus:border-primary'
						: 'focus:border-indigo-500'
				)}
			/>

			<Button
				onClick={onSubmit}
				disabled={isLoading || !phone}
				className={twMerge(
					'w-full py-2 text-white font-semibold rounded transition',
					isLoading && 'opacity-75 cursor-not-allowed',
					type === 'whatsapp' ? 'bg-primary' : 'bg-indigo-500'
				)}
			>
				{isLoading ? <MiniLoader /> : 'Send Code'}
			</Button>
		</div>
	)
}