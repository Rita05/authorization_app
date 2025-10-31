import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";


//api
import userService from "@/services/user.service"

export const useEmailForm = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition()

	const { mutate: updateEmail, isPending: isPendingUpdateEmail } = useMutation({
		mutationKey: ['update-email'],
		mutationFn: async (email: string) => userService.updateUserEmail(email),
		onSuccess() {
			startTransition(() => {
				router.push('/');
			})
		},
		onError(error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message || 'Ошибка при обновлении email');
			}
		}
	})

	const isLoading = isPending || isPendingUpdateEmail;

	return {
		updateEmail,
		isLoading
	}
}