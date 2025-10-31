import { ReactElement } from "react";
import { IconType } from "react-icons";
import {
	FaGoogle,
	FaYandex,
	FaGithub,
	FaTelegram,
	FaTwitch,
	FaWhatsapp
} from 'react-icons/fa';
import { MdSms } from 'react-icons/md';

export type TSocials =
	| 'google'
	| 'yandex'
	| 'github'
	| 'twitch'
	| 'telegram'
	| 'sms'
	| 'whatsapp'

export type SocialIcon = {
	id: TSocials
	icon: ReactElement<IconType>
	name: string
}


export const socialsList = (iconSize = 22): SocialIcon[] => [
	{ id: 'google', icon: <FaGoogle size={iconSize} />, name: 'Google' },
	{ id: 'yandex', icon: <FaYandex size={iconSize} />, name: 'Yandex' },
	// { id: 'github', icon: <FaGithub size={iconSize} />, name: 'GitHub' },
	// { id: 'twitch', icon: <FaTwitch size={iconSize} />, name: 'Twitch' },
	// { id: 'telegram', icon: <FaTelegram size={iconSize} />, name: 'Telegram' },
	// { id: 'sms', icon: <MdSms size={iconSize} />, name: 'SMS' },
	// { id: 'whatsapp', icon: <FaWhatsapp size={iconSize} />, name: 'WhatsApp' },
	// { id: 'apple', icon: <FaApple size={iconSize}  />, name: 'Apple' },
]