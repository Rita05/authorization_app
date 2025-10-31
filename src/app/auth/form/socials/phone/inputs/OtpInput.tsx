'use client'
import { twMerge } from "tailwind-merge"

//components
import { Input } from "@/components/ui/Input";
import React, { useEffect, useRef, useState } from "react";

interface Props {
	otp: string[]
	type: 'sms' | 'whatsapp'
	setOtp: (otp: string[]) => void
	onComplete: () => void
}

export const OtpInput = (props: Props) => {
	const { otp, type, setOtp, onComplete } = props;

	const otpRefs = useRef<(HTMLInputElement | null)[]>([])
	const [isCompleted, setIsCompleted] = useState(false);

	const handleOtpChange = (index: number, value: string) => {
		//Запрет на ввод цифр
		if (!/^\d?$/.test(value)) return

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp); //обновляем при вводе каждой новой цифры 

		if (value && index < otp.length - 1) {
			otpRefs.current[index + 1]?.focus() // применяем фокус к следующей ячейке
		}
	}

	//При очистке каждого значения
	const handelOtpKeyDown = (index: number, event: React.KeyboardEvent) => {
		if (event.key === 'Backspace' && !otp[index] && index > 0) {
			otpRefs.current[index - 1]?.focus();  //стираем каждое вводимое значение
		}
	}

	//Нет кнопки подтверждения ввода кода, поэтому вместо нее эффект при вводе последней цифры
	useEffect(() => {
		if (otp.every(digit => digit !== '') && otp.length === 4 && !isCompleted) {
			setIsCompleted(true);
			onComplete();
		}
	}, [otp, isCompleted, onComplete])

	return (
		<div className="flex items-center gap-4 justify-center">
			{otp.map((code, i) => {
				return (
					<Input
						key={i}
						type='text'
						maxLength={1}
						ref={(el: HTMLInputElement | null) => {
							otpRefs.current[i] = el;
						}}
						value={code}
						onChange={(event) => handleOtpChange(i, event.target.value)}
						onKeyDown={(event) => handelOtpKeyDown(i, event)}
						className={twMerge(
							'w-14 h-14 text-center border border-gray-500 rounded bg-transparent text-white !text-3xl font-semibold focus:outline-none',
							type === 'whatsapp'
								? 'focus:border-primary'
								: 'focus:border-indigo-500'
						)}
					/>
				)
			})}
		</div>
	)
}