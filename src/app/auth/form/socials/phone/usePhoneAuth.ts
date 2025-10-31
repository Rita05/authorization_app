import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

//api
import phoneAuthService from "@/services/phone-auth.service";


export const usePhoneAuth = (type: 'sms' | 'whatsapp') => {
	const [isSuccess, setIsSuccess] = useState(false)
	const router = useRouter();

	const { mutateAsync: sendCode, isPending: isSendCodePending } = useMutation({
		mutationKey: [`send-${type}-code`],
		mutationFn: (phone: string) => phoneAuthService.sendCode(phone, type),
		onSuccess() {
			toast.success('Verification code sent!');
			setIsSuccess(true);
		},
		onError() {
			toast.error('Failed to send code. Try again.');
		}
	})

	const { mutateAsync: verifyCode, isPending: isVerifyCodePending } = useMutation({
		mutationKey: [`verify-${type}-code`],
		mutationFn: ({ phone, code }: { phone: string; code: string }) =>
			phoneAuthService.verifyCode(phone, code),
		onSuccess({ accessToken }) {
			toast.success('Code verified successfully!');
			setIsSuccess(true);
			router.push(`/social-auth?accessToken=${accessToken}&needEmail=true`); //урл-прокладка для переадресации
		},
		onError() {
			toast.error('Invalid or expired code. Try again.');
		}
	})

	return {
		sendCode,
		verifyCode,
		isLoading: isSendCodePending || isVerifyCodePending,
		isSuccess
	}

}