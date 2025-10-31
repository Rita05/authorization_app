'use client'

import React, { ChangeEvent, KeyboardEvent, FocusEvent, RefObject, MouseEvent } from 'react';

import Image from 'next/image';

//icons
import crossIcon from '../../../public/cross.svg';


type InputPropsType = React.InputHTMLAttributes<HTMLInputElement> & {
	value?: string
	type?: string
	labelText?: string
	// ref?: RefObject<HTMLInputElement>
	isClearable?: boolean
	suffixIcon?: string
	className?: string
	suffixIconStyle?: string
	cancelIconStyle?: string
	onClear?: () => void
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void
	onSuffixIconClick?: (е: MouseEvent<HTMLOrSVGElement>) => void
}

export const Input = React.forwardRef<HTMLInputElement, InputPropsType>((props, ref) => {
	const {
		type,
		value,
		labelText,
		isClearable,
		suffixIcon,
		className,
		suffixIconStyle,
		cancelIconStyle,
		onChange,
		onKeyUp,
		onClear,
		onBlur,
		onFocus,
		onSuffixIconClick,
		...rest
	} = props;

	console.log('value: ', value);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e);
	};


	const renderSuffixIcon = () => {
		if (suffixIcon) {
			return (
				<>
					<span className="w-px self-stretch bg-[#cccccc] box-border" />
					<img
						src={suffixIcon}
						alt="suffixIcon"
						className={`w-4 h-4 ${suffixIconStyle || ''}`}
						onClick={onSuffixIconClick}
					/>
				</>
			)
		}
	}

	const renderCancelIcon = () => {
		// if (isClearable && value) {
		if (isClearable) {
			return (
				<Image
					src={crossIcon}
					alt='cross icon'
					width={16}
					height={16}
					className={`${cancelIconStyle || ''}`}
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
						onClear && onClear()
					}}
				/>
			)
		}
	}

	return (
		<label className="flex items-center flex-col">
			<span className='flex self-start text-lg mt-4'>{labelText}</span>
			<div className="relative flex items-center w-full">
				<input
					type={type}
					className={`flex-grow ${className}`}
					autoComplete={'off'}
					ref={ref}
					value={value}
					onChange={handleChange}
					onKeyUp={onKeyUp}
					onFocus={onFocus}
					onBlur={onBlur}
					{...rest}
				/>
				<div className="absolute right-[10px] bottom-1/2 translate-y-1/2 flex flex-shrink-0 items-center self-stretch box-border cursor-pointer">
					{renderCancelIcon()}
					{renderSuffixIcon()}
				</div>
			</div>
		</label>
	)
}
)
