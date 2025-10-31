import { AxiosError } from "axios";

export const getContentType = () => ({
	'Content-Type': 'application/json'
})

export const errorCatch = (error: unknown): string => {
	const err = error as AxiosError<{ message: string | string[] }>;
	const message = err?.response?.data?.message;

	if (!message) return err.message;

	return Array.isArray(message) ? message[0] : message;
}