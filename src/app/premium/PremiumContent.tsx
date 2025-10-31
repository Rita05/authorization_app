'use client'

import { useQuery } from "@tanstack/react-query"

//components
import { MiniLoader } from "@/components/ui/MiniLoader";

//api 
import userService from "@/services/user.service";

export const PremiumContent = () => {

	const { data, isLoading } = useQuery({
		queryKey: ['premium-content'],
		queryFn: () => userService.getPremium()
	})

	return (
		<div className="flex flex-col">
			<h1>Only for premium users</h1>
			{isLoading ? (
				<MiniLoader
					width={100}
					height={100}
					isDark
					className="min-h-screen flex self-center justify-center" />
			) : (
				<p>{data?.data.text || 'Not found!'}</p>
			)}
		</div>
	)
}