'use client'

import { type MouseEvent, type ReactNode } from 'react'
import { AnimatePresence, m } from "framer-motion";
import Image from 'next/image';

import crossIcon from '../../../public/cross.svg';

//components
import { Button } from "./Button";

interface Props {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

//Млдальное окно для sms, telegram and whats'up
export const Modal = (props: Props) => {
	const { isOpen, onClose, children } = props;

	const handleOutsideClick = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<m.div
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={handleOutsideClick}
				>
					<m.div
						className="bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-sm relative"
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
					>
						<Button
							onClick={onClose}
							className="absolute top-0 right-2 text-gray-500 hover:text-gray-700"
						>
							<Image
								src={crossIcon}
								alt="crossIcon"
								width={10}
								height={10}
							/>
						</Button>
					</m.div>
				</m.div>
			)}
		</AnimatePresence>
	)
}