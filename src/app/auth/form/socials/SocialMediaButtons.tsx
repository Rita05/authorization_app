'use client'
import { useState } from "react";
import { twMerge } from "tailwind-merge";

//components
import { Button } from "@/components/ui/Button";
import { MiniLoader } from "@/components/ui/MiniLoader";
import { TelegramLoginModal } from "./TelegramLoginModal";


import { BACKEND_SOCIAL_AUTH_URL } from "@/constants";
import { socialsList, TSocials } from "./social-list.data";

//Вне компонента, чтобы не страдала оптимизация 
const listIcons = socialsList();

export const SocialMediaButtons = () => {
	const [loadingId, setLoadingId] = useState<TSocials | null>(null);

	const [openModalId, setOpenModalId] = useState<TSocials | null>(null);

	const handleRedirect = (id: TSocials) => {
		console.log('id: ', id);
		setLoadingId(id);
		if (id === 'sms' || id === 'whatsapp' || id === 'telegram') {
			setOpenModalId(id);
		} else {
			window.location.href = `${BACKEND_SOCIAL_AUTH_URL}/${id}`; //такое перенаправление, так как оно идет на адрес бэкенда 
		}
	}

	//Метод сброса всего при закрытии модалки любой из социальных сетей
	const reset = () => {
		setOpenModalId(null);
		setLoadingId(null);
	}

	return (
		<>
			<div className="grid grid-cols-5 gap-4 mt-4 w-full justify-items-center">
				{listIcons.map(({ id, icon }) => {
					return (
						<Button
							key={id}
							type='button'
							disabled={loadingId === id}
							className={twMerge(
								'flex items-center justify-center w-13 h-13 rounded-full p-2 border-none font-medium text-gray-700 hover:text-gray-900 bg-white transition hover:scale-105 hover:shadow-lg will-change-transform cursor-pointer',
								loadingId === id && 'bg-white/80 cursor-not-allowed',
								id === 'sms' && 'col-span-2'
							)}
							style={{ boxShadow: '0 1px 3px #0000001f, 0 1px 1px #00000024, 0 1px 3px -2px #0003' }}
							onClick={() => handleRedirect(id)}
						>
							{loadingId === id ? (
								<MiniLoader
									width={20}
									height={20}
								/>
							) : (
								icon
							)}
						</Button>
					)
				})}
			</div>
			{/* <TelegramLoginModal
				isOpen={openModalId === 'telegram'}
				onClose={reset}
			/> */}
			{/* <PhoneAuthModal
				isOpen={openedModalId === 'sms'}
				type="sms"
				onClose={reset}
			/>
			<PhoneAuthModal
				isOpen={openedModalId === 'whatsapp'}
				type="whatsapp"
				onClose={reset}
			/> */}
		</>
	)
}