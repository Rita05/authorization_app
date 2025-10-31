'use client'

import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent, ReactNode } from "react"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement>

export type ButtonPropsType = DefaultButtonPropsType & {
	isDisabled?: boolean,
}

export const Button = (props: ButtonPropsType) => {
	const {
		onClick,
		isDisabled,
		className,
		...restProps
	} = props;
	return (
		<button
			className={className}
			onClick={onClick}
			disabled={isDisabled}
			{...restProps}
		/>
	)

}