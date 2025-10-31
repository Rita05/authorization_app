'use client'
import { LoginButton } from "@telegram-auth/react";

//components
import { Modal } from "@/components/ui/Modal";
import { TG_AUTH_REDIRECT_URL } from "@/constants";

interface Props {
	isOpen: boolean
	onClose: () => void
}

//указать свой botUsername при создании бота, токен отправляет на бэкенд

export const TelegramLoginModal = ({ isOpen, onClose }: Props) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<h2 className="font-semibold mb-6">Войти через Telegram</h2>
			<LoginButton
				botUsername="mk_auth_4_0_test_bot"
				authCallbackUrl={TG_AUTH_REDIRECT_URL}
				buttonSize="large"
				cornerRadius={5}
				lang="ru"
			/>
		</Modal>
	)
}