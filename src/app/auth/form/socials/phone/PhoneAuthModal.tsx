
import { useState } from "react";

//components
import { Modal } from "@/components/ui/Modal";
import { PhoneNumberInput } from "./inputs/PhoneNumberInput";
import { OtpInput } from "./inputs/OtpInput";

//hooks
import { usePhoneAuth } from "./usePhoneAuth";

interface Props {
	isOpen: boolean
	type: 'sms' | 'whatsapp'
	onClose: () => void
}

//Требует отдельного протокола 
export const PhoneAuthModal = ({ isOpen, type, onClose }: Props) => {
	const [phone, setPhone] = useState('');
	const [otp, setOtp] = useState(['', '', '']);
	const [step, setStep] = useState<'phone' | 'otp'>('phone');

	const { sendCode, verifyCode, isLoading } = usePhoneAuth(type);

	const hnadleSendCode = async () => {
		if (!phone) return;
		const success = await sendCode(phone);
		if (success) setStep('otp');
	}

	const handleVerifyCode = async () => {
		const code = otp.join('');
		if (code.length < 4) return
		const success = await verifyCode({ phone, code });
		if (success) onClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<h2 className="font-semibold mb-4 text-center text-white">
				{step === 'phone'
					? `Enter your ${type === 'sms' ? 'phone' : 'WhatsApp'} number`
					: 'Enter verification code'}
			</h2>
			{
				step === 'phone' ? (
					<PhoneNumberInput
						type={type}
						phone={phone}
						setPhone={setPhone}
						onSubmit={hnadleSendCode}
						isLoading={isLoading}
					/>
				) : (
					<OtpInput
						type={type}
						otp={otp}
						setOtp={setOtp}
						onComplete={handleVerifyCode}
					/>
				)
			}
		</Modal>
	)
}